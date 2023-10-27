// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**
 * https://github.com/maticnetwork/pos-portal/blob/master/contracts/common/ContextMixin.sol
 */

abstract contract ContextMixin {
    function msgSender() internal view returns (address payable sender) {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            sender = payable(msg.sender);
        }
        return sender;
    }
}

/// @custom:security-contact <security email address>
contract Web3TunesNFT is ERC1155, IERC2981, Ownable, Pausable, ContextMixin {
    using Strings for uint256;
    string public name;
    string public symbol;
    address private _recipient;
    mapping(uint256 => string) private _uris;

    constructor() ERC1155("") {
        name = "Web3TunesNFT";
        symbol = "W3TN";
        _recipient = owner();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        _mint(account, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, "");
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /** @dev URI override for OpenSea traits compatibility. */

    function uri(uint256 tokenId) public view override returns (string memory) {
        return (_uris[tokenId]);
    }

    function setTokenUri(uint256 tokenId, string memory _uri)
        external
        onlyOwner
    {
        require(bytes(_uris[tokenId]).length == 0, "Cannot set uri twice");
        _uris[tokenId] = _uri;
    }

    /** @dev EIP2981 royalties implementation. */

    // Maintain flexibility to modify royalties recipient (could also add basis points).
    function _setRoyalties(address newRecipient) internal {
        require(
            newRecipient != address(0),
            "Royalties: new recipient is the zero address"
        );
        _recipient = newRecipient;
    }

    function setRoyalties(address newRecipient) external onlyOwner {
        _setRoyalties(newRecipient);
    }

    // EIP2981 standard royalties return.
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (_recipient, (_salePrice * 1000) / 10000);
    }

    // EIP2981 standard Interface return. Adds to ERC1155 and ERC165 Interface returns.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, IERC165)
        returns (bool)
    {
        return (interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId));
    }

    /** @dev Meta-transactions override for OpenSea. */

    function _msgSender() internal view override returns (address) {
        return ContextMixin.msgSender();
    }

    /** @dev Contract-level metadata for OpenSea. */

    // Update for collection-specific metadata.
    function contractURI() public pure returns (string memory) {
        return
            "ipfs://bafkreiflvlb3iqk7m6gxkewa2sfgiimrxhaedctfzs5ttb4apawpoc7xlm"; // Contract-level metadata for Web3Tunes
    }
}

contract Web3TunesMarketplace is ERC1155Holder, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _listingIds;
    Counters.Counter private _sales;
    Web3TunesNFT private nftContract;
    uint256 private platformFee = 25; // .25%
    uint256 private royalty = 100; // 10%
    uint256 private deno = 1000;

    constructor(address _nftContract) {
        nftContract = Web3TunesNFT(_nftContract);
    }

    struct Listing {
        uint256 listingId;
        uint256 nftId;
        uint256 amount;
        uint256 soldAmount;
        uint256 price;
        address payable seller;
        address payable owner;
        bool sold;
    }

    mapping(uint256 => Listing) public listings;

    /// @notice It will list the NFT to marketplace.
    /// @dev It will list NFT minted from Web3TunesNFT contract.
    function listNft(
        uint256 nftId,
        uint256 amount,
        uint256 price
    ) external {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        listings[listingId] = Listing(
            listingId,
            nftId,
            amount,
            0,
            price,
            payable(msg.sender),
            payable(owner()),
            false
        );

        Web3TunesNFT(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            nftId,
            amount,
            ""
        );
    }

    /// @notice It will buy the NFT from marketplace.
    /// @dev User will able to buy NFT and transfer to respectively owner or user and platform fees, roylty fees also deducted          from this function.

    function buyNFT(uint256 listingId, uint256 amount) external payable {
        uint256 price = listings[listingId].price;
        uint256 royaltyPer = (price * royalty) / deno;
        uint256 marketFee = (price * platformFee) / deno;

        require(amount <= listings[listingId].amount, "Out of stock");
        require(
            msg.value == (price * amount) + (royaltyPer * amount) + marketFee,
            "Please submit the asking price"
        );

        // Pay to current owner
        payable(listings[listingId].seller).transfer(price * amount);
        // Pay royalty to actual owner
        payable(owner()).transfer(royaltyPer * amount);

        listings[listingId].amount = listings[listingId].amount - amount;
        listings[listingId].soldAmount =
            listings[listingId].soldAmount +
            amount;
        _sales.increment();

        // Transfer asset(s) to the new owner
        nftContract.safeTransferFrom(
            address(this),
            msg.sender,
            listings[listingId].nftId,
            amount,
            ""
        );
        onERC1155Received(
            address(this),
            msg.sender,
            listings[listingId].nftId,
            amount,
            ""
        );
    }

    function setPlatformFee(uint256 _fee) external onlyOwner {
        platformFee = _fee;
    }

    function setRoyalty(uint256 _royalty) external onlyOwner {
        royalty = _royalty;
    }
}

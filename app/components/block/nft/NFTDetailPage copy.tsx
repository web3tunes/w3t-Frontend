"use client";

import Image from "next/image";
import Countdown from "react-countdown";
import Link from "next/link";
import NFTDetailsTab from "./NFTDetailsTab";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "@/utils/httpHelper";
import {
  getBNBToAUD,
  isObjectEmpty,
  percentage,
  toaster,
} from "@/utils/helper";
import moment from "moment";
import { CURRENCY_SYMBOL, TOKEN_SYMBOL } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";
import { etherTunesMarketContract } from "@/contracts/contractHelper";
import { isLoggedIn } from "@/utils/jwtHelper";
import ReactAudioPlayer from "react-audio-player";
import { setActiveTab } from "@/store/slice/userProfileSlice";
import { useUser } from "@/context/UserContext";
import { useWeb3 } from "@/context/Web3Context";
import { magic } from "@/libs/magic";

export default function NFTDetailPage(): JSX.Element {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [nftDetails, setNFTDetails] = useState<any>({});
  const [priceInAUD, setPriceInAUD] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { address, balance } = useUser();
  const { initializeWeb3, web3 } = useWeb3();

  // Define the event handler for the button click
  const handleConnect = async () => {
    try {
      if (typeof window != "undefined") {
        if (!magic) return;

        // Try to connect to the wallet using Magic's user interface
        await magic?.wallet.connectWithUI();

        // If connection to the wallet was successful, initialize new Web3 instance
        initializeWeb3();
      }
    } catch (error) {
      // Log any errors that occur during the connection process
      console.error("handleConnect:", error);
    }
  };
  const fetchNFTDetails = async () => {
    dispatch(setLoading(true));
    const response = await getRequest(`user/nftDetail/${id}`);
    if (response.statusCode === 200) {
      const { nft } = response.data;
      console.log(nft);
      setNFTDetails(nft);
    }
    dispatch(setLoading(false));
  };
  const incrementHandler = () => {
    let qnty = quantity;
    qnty++;
    if (nftDetails?.quantity - nftDetails?.soldQuantity < qnty) {
      return quantity;
    }
    setQuantity(qnty);
  };
  const decrementHandler = () => {
    let qnty = quantity;
    qnty--;
    if (qnty < 1) {
      return quantity;
    }
    setQuantity(qnty);
  };
  const buyNFT = async () => {
    try {
      dispatch(setLoading(true));
      if (!isLoggedIn()) {
        handleConnect();
        toaster("error", "Please login first then try");
        dispatch(setLoading(false));
        return;
      }
      if (!address) {
        toaster("error", "Please login first");
        dispatch(setLoading(false));
        return;
      }
      let price = nftDetails.price;
      // if (balance && balance < price) {
      //   toaster(
      //     "error",
      //     "You do not have enough balance to make this transaction"
      //   );
      //   dispatch(setLoading(false));
      //   return;
      // }
      let priceInWei = Number(
        Number(web3?.utils.toWei(String(price), "ether")) * quantity +
          ((Number(web3?.utils.toWei(String(price), "ether")) * 100) / 1000) *
            quantity +
          (Number(web3?.utils.toWei(String(price), "ether")) * 25) / 1000
      );
      // let priceInWei = Number(web3?.utils.toWei(Number(price),"ether")) * quantity
      const listingId = nftDetails.mintedDetails[0].listingId;
      console.log(listingId);
      const marketplaceContract = await etherTunesMarketContract();
      let tx = await marketplaceContract.buyNFT(listingId, quantity, {
        value: priceInWei.toString(),
      });
      tx = await tx.wait();
      const data = {
        txHash: tx.transactionHash,
        soldQuantity: quantity,
        paidPrice: web3?.utils.fromWei(priceInWei.toString(), "ether"),
        web3TuneId: nftDetails.id,
      };
      const response = await postRequest("user/purchase", data);
      if (response.statusCode === 200) {
        toaster("success", "Successfully purchased");
        dispatch(setActiveTab("purchased"));
        router.push("/profile");
        dispatch(setLoading(false));
        return;
      }
      const { message } = response;
      if (message) {
        toaster("error", message);
      }
      dispatch(setLoading(false));
    } catch (error: any) {
      toaster("error", error?.message);
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (id) {
      fetchNFTDetails();
    }
  }, [id]);
  const getRates = async () => {
    const rates = await getBNBToAUD();
    setPriceInAUD(rates.AUD);
    console.log(rates);
  };
  useEffect(() => {
    if (!isObjectEmpty(nftDetails)) {
      getRates();
    }
  }, [nftDetails]);
  return (
    <>
      <div className="tf-section tf-item-details style-2">
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="content-left">
                <div className="media">
                  <Image
                    height={1000}
                    width={1000}
                    src={nftDetails?.coverImage || "/assets/images/default.png"}
                    alt=""
                  />
                </div>
                <div className="meta-item-details mt-5">
                  <div className="item-style track-detail">
                    <div className="item-d">
                      <span className="item-head">Music Track</span>
                      <span className="item-des">
                        <ReactAudioPlayer
                          src={nftDetails?.musicFile}
                          controls
                        />
                      </span>
                    </div>
                  </div>
                </div>
                {nftDetails?.artWorkImage && (
                  <div className="meta-item-details mt-5">
                    <div className="item-style track-detail">
                      <div className="item-d">
                        <span className="item-head">Track Art Work</span>
                        <span className="item-des">
                          <Image
                            height={1000}
                            width={1000}
                            src={
                              nftDetails?.artWorkImage ||
                              "/assets/images/default.png"
                            }
                            alt=""
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {nftDetails?.trackVisualizer && (
                  <div className="meta-item-details mt-5">
                    <div className="item-style track-detail">
                      <div className="item-d">
                        <span className="item-head">Track Visualizer</span>
                        <span className="item-des">
                          <ReactAudioPlayer
                            src={nftDetails?.trackVisualizer}
                            controls
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {nftDetails?.projectArtWork && (
                  <div className="meta-item-details mt-5">
                    <div className="item-style track-detail">
                      <div className="item-d">
                        <span className="item-head">Project Art Work</span>
                        <span className="item-des">
                          <Image
                            height={1000}
                            width={1000}
                            src={
                              nftDetails?.projectArtWork ||
                              "/assets/images/default.png"
                            }
                            alt=""
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="content-right">
                <div className="sc-item-details">
                  <div className="meta-item">
                    <div className="left">
                      <h2>{nftDetails?.name}</h2>
                    </div>
                    <div className="right d-none">
                      <span className="viewed eye mg-r-8">225</span>
                      <span className="liked heart wishlist-button">
                        <span className="number-like">100</span>
                      </span>
                    </div>
                  </div>
                  <div className="client-infor sc-card-product">
                    <div className="meta-info">
                      <div className="author">
                        <div className="avatar">
                          <Image
                            height={200}
                            width={200}
                            src={
                              nftDetails?.walletUser?.profileImage ||
                              "/assets/images/userDefault.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="info">
                          <span>Created By</span>
                          <h6>
                            <Link href="#">{nftDetails?.artistName}</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="meta-info d-none">
                      <div className="author">
                        <div className="avatar">
                          <Image
                            height={200}
                            width={200}
                            src="/assets/images/avatar/avt-2.jpg"
                            alt=""
                          />
                        </div>
                        <div className="info">
                          <span>Create By</span>
                          <h6>
                            <Link href="/authors-2">Freddie Carpenter</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>{nftDetails?.description}</p>
                  <div className="meta-item-details">
                    <div className="item-style">
                      <div className="item-d">
                        <span className="item-head">Quantity: </span>
                        <span className="item-head">
                          {nftDetails?.soldQuantity === 0
                            ? nftDetails?.quantity
                            : nftDetails?.quantity - nftDetails?.soldQuantity}
                          /{nftDetails?.quantity}
                        </span>
                      </div>
                      <div className="item-d">
                        <span className="item-head">
                          Price in {TOKEN_SYMBOL}:{" "}
                        </span>
                        <span className="item-des">
                          {nftDetails?.price} {TOKEN_SYMBOL}
                        </span>
                      </div>
                      <div className="item-d">
                        <span className="item-head">
                          Price in {CURRENCY_SYMBOL}:{" "}
                        </span>
                        <span className="item-des">
                          {nftDetails?.price * priceInAUD} {CURRENCY_SYMBOL}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="meta-item-details bottom">
                    <div className="item-style">
                      <div className="item-d">
                        <span className="item-head">Artist: </span>
                        <span className="item-des">
                          {nftDetails?.artistName}
                        </span>
                      </div>
                      <div className="item-d">
                        <span className="item-head">Date: </span>
                        <span className="item-des">
                          {moment(nftDetails?.createdAt).format("MMM Do YYYY")}
                        </span>
                      </div>
                    </div>
                  </div> */}
                  <NFTDetailsTab nftDetails={nftDetails} />
                  <br />
                  <br />
                  <h4 className="input-head">Select your quantity</h4>
                  <div className="qnty-meta">
                    <button
                      className="btn btn-qnty"
                      onClick={() => decrementHandler()}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="input-qnty"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-qnty"
                      onClick={() => incrementHandler()}
                    >
                      +
                    </button>
                  </div>
                  <div className="meta-item-details bottom">
                    <div className="item-style">
                      <div className="item-d">
                        <span className="item-head">
                          Total Price in {TOKEN_SYMBOL}:{" "}
                        </span>
                        <span className="item-des">
                          {nftDetails?.price} {TOKEN_SYMBOL} x {quantity} +
                          0.25% ={" "}
                          {(
                            nftDetails?.price * quantity +
                            percentage(nftDetails?.price * quantity, 0.25)
                          ).toFixed(5)}{" "}
                          {TOKEN_SYMBOL}
                        </span>
                      </div>
                      <div className="item-d">
                        <span className="item-head">
                          Total Price in {CURRENCY_SYMBOL}:{" "}
                        </span>
                        <span className="item-des">
                          {(nftDetails?.price * priceInAUD).toFixed(5)}{" "}
                          {CURRENCY_SYMBOL} x {quantity} + 0.25% ={" "}
                          {(
                            (nftDetails?.price * quantity +
                              percentage(nftDetails?.price * quantity, 0.25)) *
                            priceInAUD
                          ).toFixed(5)}{" "}
                          {CURRENCY_SYMBOL}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* {nftDetails?.isMinted ? (
                    nftDetails?.quantity - nftDetails?.soldQuantity !== 0 ? (
                      <a
                        onClick={() => buyNFT()}
                        className="sc-button loadmore style bag fl-button pri-3"
                      >
                        <span>Buy</span>
                      </a>
                    ) : (
                      <a className="sc-button loadmore style bag fl-button pri-3">
                        <span>Sold</span>
                      </a>
                    )
                  ) : (
                    <a className="sc-button loadmore style bag fl-button pri-3">
                      <span>Comming Soon</span>
                    </a>
                  )} */}
                  {nftDetails?.isMinted ? (
                    <a
                      onClick={() => buyNFT()}
                      className="sc-button loadmore style bag fl-button pri-3"
                    >
                      <span>Buy</span>
                    </a>
                  ) : (
                    <a className="sc-button loadmore style bag fl-button pri-3">
                      <span>Comming Soon</span>
                    </a>
                  )}
                  {nftDetails?.isMinted && (
                    <a
                      href={`https://testnets.opensea.io/assets/mumbai/${process.env.NEXT_PUBLIC_WEB3TUNES_NFT_ADDRESS}/${nftDetails?.mintedDetails?.[0]?.nftId}`}
                      target="_blank"
                      className="sc-button loadmore style fl-button pri-3"
                    >
                      <span>View on OpenSea</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

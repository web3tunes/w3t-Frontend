// @ts-nocheck
import Web3 from "web3"
import WEB3TUNES_NFT_ADDRESS from "./WEB3TUNES_NFT_ADDRESS.json"
import WEB3TUNES_MARKETPLACE from "./WEB3TUNES_MARKETPLACE.json"
import { ethers } from "ethers"
import { magic } from "@/libs/magic"
const PROVIDER = 'https://goerli.blockpi.network/v1/rpc/public'
function web3Intance(signer): any {
    return new Web3(signer)
}
export const getSigner = async () => {
    if (!magic) return
    const givenProvider = await magic.wallet.getProvider();
    const provider = new ethers.providers.Web3Provider(givenProvider)
    return provider.getSigner()
}
// const signer = typeof window != 'undefined' && (new ethers.providers.Web3Provider(window.ethereum)).getSigner()


export const etherProvider = () => {

    const provider = new ethers.providers.Web3Provider(Web3.givenProvider)
    return provider
}
export const etherTunesMainContract = async () => {
    const signer = await getSigner()
    return new ethers.Contract(process.env.NEXT_PUBLIC_WEB3TUNES_NFT_ADDRESS, WEB3TUNES_NFT_ADDRESS, signer);
}
export const etherTunesMarketContract = async () => {
    const signer = await getSigner()
    return new ethers.Contract(process.env.NEXT_PUBLIC_WEB3TUNES_MARKETPLACE_ADDRESS, WEB3TUNES_MARKETPLACE, signer);
}

function web3TunesContract(web3): any {
    return new web3.eth.Contract(WEB3TUNES_NFT_ADDRESS, process.env.NEXT_PUBLIC_WEB3TUNES_NFT_ADDRESS)
}

function web3TunesMarketplaceContract(web3): any {
    return new web3.eth.Contract(WEB3TUNES_MARKETPLACE, process.env.NEXT_PUBLIC_WEB3TUNES_MARKETPLACE_ADDRESS)
}

function adminWeb3TunesContract(signer): any {
    const web3 = web3Intance(signer)
    return new web3.eth.Contract(WEB3TUNES_NFT_ADDRESS, process.env.NEXT_PUBLIC_WEB3TUNES_NFT_ADDRESS)
}

function adminWeb3TunesMarketplaceContract(signer): any {
    const web3 = web3Intance(signer)
    return new web3.eth.Contract(WEB3TUNES_MARKETPLACE, process.env.NEXT_PUBLIC_WEB3TUNES_MARKETPLACE_ADDRESS)
}



export { web3Intance, web3TunesContract, web3TunesMarketplaceContract, adminWeb3TunesContract, adminWeb3TunesMarketplaceContract }
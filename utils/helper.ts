// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { getIn } from "formik";
import { toast } from "react-hot-toast";
import { getRequest } from "./httpHelper";
import { v1 as uuidv1 } from 'uuid';

import { Web3Storage } from "web3.storage";
import axios from "axios";
import { ethers } from "ethers";



function shortenHexString(
    hexString: String | undefined,
    startLength: number,
    endLength: number
) {
    const prefix = hexString?.slice(0, startLength);
    const suffix = hexString?.slice(-endLength);
    return prefix + "...." + suffix;
}

function arrayContainsValue(arr: number[], value: number): boolean {
    return arr.includes(value);
}

function generateFileName() {
    // const v4options = {
    //     node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    //     clockseq: 0x1234,
    //     msecs: new Date().getTime(),
    //     nsecs: 5678,
    // };
    const v1options = {
        node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
        clockseq: 0x1234,
        msecs: new Date('2011-11-01').getTime(),
        nsecs: 5678,
    };

    return uuidv1(v1options)
}


function getStyles(errors: any, fieldName: string) {
    if (getIn(errors, fieldName)) {
        return {
            border: '1px solid rgb(207, 81, 81)'
        }
    }
}

function signTextMessage(account: string, nonce: string) {
    const message = `Welcome to MusicNFT!\n\nWallet address:\n${account}\n\nNonce: ${nonce}`
    return message
}
function toaster(type: string, msg: string) {
    const config = {
        duration: 4000,
    }
    if (type === 'success') {
        return toast.success(msg, config)
    } else if (type === 'error') {
        return toast.error(msg, config)
    }
}
function isObjectEmpty(obj: object): boolean {
    if (!obj) {
        return true; // If the object is null or undefined, consider it empty
    }

    return Object.keys(obj).length === 0;
}
async function isUserTokenValid() {
    const response = await getRequest('user/checkToken')
    if (response.statusCode === 200) {
        return true
    }
    return false
}
function isFile(value: any): value is File {
    return value instanceof File;
}
function isBlob(value: any): value is Blob {
    return value instanceof Blob;
}
function isURL(value: any): value is URL {
    return value instanceof URL;
}
function isValidURL(value: string): boolean {
    try {
        new URL(value);
        return true;
    } catch (error) {
        return false;
    }
}


function getFileExtensionFromURL(url: string): string | null {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const lastDotIndex = pathname.lastIndexOf('.');

    if (lastDotIndex !== -1 && lastDotIndex < pathname.length - 1) {
        return pathname.slice(lastDotIndex + 1).toLowerCase();
    }

    return null;
}
function ipfsInstance() {
    const token: string = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY || "";
    return new Web3Storage({ token });
}
const urlToObject = async (url: string) => {
    const extension = getFileExtensionFromURL(url)
    const response = await fetch(url);
    // here image is url/location of image
    const blob = await response.blob();
    const filename = generateFileName() + '.' + extension
    const file = new File([blob], filename, { type: blob.type });
    return file
}
const getMimeType = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob.type
}
function createFileListFromFile(file: File): FileList {
    const fileList = new DataTransfer();
    fileList.items.add(file);
    return fileList.files;
}

async function createIpfsUrlFromFileUrl(url: string): Promise<string> {
    const file = await urlToObject(url)
    const fileList = createFileListFromFile(file)
    const cid = await ipfsInstance().put(fileList, { wrapWithDirectory: false });
    return `https://ipfs.io/ipfs/${cid}`
}

async function getBNBToAUD() {
    const response = await axios.get("https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=AUD", {
        headers: {
            authorization: "Apikey 6da0ad138f086f2443e02cc377d52e80927088b96e4a646039b343e810ce2383"
        }
    })
    if (response.status === 200) {
        const { data } = response
        return data
    }
    return response
}
function percentage(num: number, per: any) {
    return (num / 100) * per;
}
const priceToEther = (price: string) => {
    return ethers.utils.parseUnits(price, 'ether')
}
function roundToTwoDecimalPlaces(num: number): number {
    return parseFloat(num.toFixed(2));
}
export {
    shortenHexString,
    arrayContainsValue,
    getStyles,
    signTextMessage,
    toaster,
    isObjectEmpty,
    isUserTokenValid,
    isFile,
    isBlob,
    isURL,
    isValidURL,
    ipfsInstance,
    urlToObject,
    createFileListFromFile,
    generateFileName,
    getFileExtensionFromURL,
    createIpfsUrlFromFileUrl,
    getMimeType,
    getBNBToAUD,
    percentage,
    priceToEther,
    roundToTwoDecimalPlaces
}
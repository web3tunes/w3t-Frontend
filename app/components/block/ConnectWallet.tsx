"use client";
import Image from "next/image";
import Link from "next/link";
import { useMetaMask } from "metamask-react";

export default function ConnectWallet() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    let nftStatus;

    if (status === "initializing")
        nftStatus = "Synchronisation with MetaMask ongoing...";

    if (status === "unavailable") {
        nftStatus = "MetaMask not available";
    }

    if (status === "notConnected") {
        nftStatus = <a onClick={connect}>Connect to MetaMask</a>;
    }

    if (status === "connecting") {
        nftStatus = "Connecting...";
    }

    if (status === "connected") {
        nftStatus = "MetaMask Connected";
    }

    return (
        <>
            <div className="tf-connect-wallet tf-section">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="tf-title-heading ct style-2 mg-bt-12">
                                Connect Your Wallet
                            </h2>
                            <h5 className="sub-title ct style-1 pad-400">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Laborum obcaecati dignissimos
                                quae quo ad iste ipsum officiis deleniti
                                asperiores sit.
                            </h5>
                        </div>
                        <div className="col-md-12">
                            <div className="sc-box-icon-inner style-2">
                                <div className="sc-box-icon">
                                    <div className="img">
                                        <Image
                                            src="/assets/images/icon/icon-1.png"
                                            alt="Image"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <h4 className="heading">{nftStatus}</h4>
                                    <p className="content">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt
                                    </p>
                                </div>
                                <div className="sc-box-icon">
                                    <div className="img">
                                        <Image
                                            src="/assets/images/icon/icon-6.png"
                                            alt="Image"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <h4 className="heading">
                                        <Link href="/login">Bitski</Link>
                                    </h4>
                                    <p className="content">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt
                                    </p>
                                </div>
                                <div className="sc-box-icon">
                                    <div className="img">
                                        <Image
                                            src="/assets/images/icon/Vector.png"
                                            alt="Image"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <h4 className="heading">
                                        <Link href="/login">Fortmatic</Link>
                                    </h4>
                                    <p className="content">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt
                                    </p>
                                </div>
                                <div className="sc-box-icon">
                                    <div className="img">
                                        <Image
                                            src="/assets/images/icon/WalletConnect.png"
                                            alt="Image"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <h4 className="heading">
                                        <Link href="/login">
                                            Wallet Connect
                                        </Link>
                                    </h4>
                                    <p className="content">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt
                                    </p>
                                </div>
                                <div className="sc-box-icon mgbt-0 mgbt-30">
                                    <div className="img">
                                        <Image
                                            src="/assets/images/icon/icon-2.png"
                                            alt="Image"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <h4 className="heading">
                                        <Link href="/login">
                                            Coinbase Wallet
                                        </Link>
                                    </h4>
                                    <p className="content">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt
                                    </p>
                                </div>
                                <div className="sc-box-icon mgbt-0 mgbt-30">
                                    <div className="img">
                                        <Image
                                            src="/assets/images/icon/icon-3.png"
                                            alt="Image"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <h4 className="heading">
                                        <Link href="/login">Authereum</Link>
                                    </h4>
                                    <p className="content">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt
                                    </p>
                                </div>
                                <div className="sc-box-icon mgbt-0">
                                    <div className="img">
                                        <Image
                                            src="/assets/images/icon/icon-4.png"
                                            alt="Image"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <h4 className="heading">
                                        <Link href="/login">Kaikas</Link>
                                    </h4>
                                    <p className="content">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt
                                    </p>
                                </div>
                                <div className="sc-box-icon">
                                    <div className="img">
                                        <Image
                                            src="/assets/images/icon/icon-5.png"
                                            alt="Image"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <h4 className="heading">
                                        <Link href="/login">Torus</Link>
                                    </h4>
                                    <p className="content">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

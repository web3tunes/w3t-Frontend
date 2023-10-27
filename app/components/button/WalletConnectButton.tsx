"use client";

import AdminBar from "../header/AdminBar";
import { useEffect, useState } from "react";
import { isAdminLoggedIn, isLoggedIn } from "@/utils/jwtHelper";
import { isUserTokenValid, signTextMessage } from "@/utils/helper";
import { getRequest, postRequest } from "@/utils/httpHelper";
import {
  clearAllLocalstorageData,
  setLocalstorageData,
} from "@/utils/localstorageHelper";
import { JWT_TOKEN } from "@/utils/constant";
import Link from "next/link";
import { useWeb3 } from "@/context/Web3Context";
import { magic } from "@/libs/magic";
import { useUser } from "@/context/UserContext";

export default function WalletConnectButton(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  // const { address, isConnected } = useAccount();
  const [message, setMessage] = useState("");
  const [profileData, setProfileDtaa] = useState({});
  const [checkUser, setCheckUser] = useState("pending");
  const [signature, setSignature] = useState("");
  const { user, address } = useUser();
  const { initializeWeb3, web3, walletType } = useWeb3();

  // Define the event handler for the button click
  const handleConnect = async () => {
    try {
      // Try to connect to the wallet using Magic's user interface
      if (!magic) return;

      await magic.wallet.connectWithUI();
      // await magic.wallet.requestUserInfoWithUI({
      //   scope: { email: "required" },
      // });
      //   console.log(email)
      // If connection to the wallet was successful, initialize new Web3 instance
      initializeWeb3();
    } catch (error) {
      // Log any errors that occur during the connection process
      console.error("handleConnect:", error);
    }
  };
  const walletConnection = () => (
    <>
      {user || isLoggedIn() || isAdminLoggedIn() ? (
        <AdminBar profile={profileData} />
      ) : (
        <button
          onClick={handleConnect}
          className="sc-button header-slider style style-1 wallet fl-button pri-1"
        >
          Login
        </button>
      )}
    </>
  );
  const walletSignSignature = async () => {
    const response: any = await postRequest("user/generateNonce", {
      web3Address: address,
      provider: walletType,
    });
    if (response.statusCode === 200) {
      const { user } = response.data;
      if (address) {
        setMessage(signTextMessage(address, user.nonce));
      }
    }
  };
  const verifySignature = async () => {
    if (isAdminLoggedIn()) return;
    const response = await postRequest("user/verifyUser", {
      web3Address: address,
      txHash: signature,
    });
    if (response.statusCode === 200) {
      const { accessToken } = response.data;
      setLocalstorageData({ key: JWT_TOKEN, value: accessToken });
      setCheckUser("verified");
    }
  };
  const checkToken = async () => {
    const res = await isUserTokenValid();
    if (!res) {
      if (address) {
        console.log(address);
        setCheckUser("notVerified");
        await walletSignSignature();
      } else {
        clearAllLocalstorageData();
      }
    }
  };
  const fetchUserProfileData = async () => {
    const response = await getRequest("user/profile");
    if (response.statusCode === 200) {
      const { profile } = response.data;
      setProfileDtaa(profile);
    }
  };
  const signMessageRequest = async () => {
    try {
      if (!web3 || !address) return;
      const signedMessage = await web3.eth.personal.sign(message, address, "");
      setSignature(signedMessage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(walletType);
  }, [walletType]);
  useEffect(() => {
    if (address && message && checkUser === "notVerified") {
      signMessageRequest();
      setCheckUser("verifying");
    }
  }, [checkUser, message]);
  useEffect(() => {
    if (checkUser === "verifying" && signature) {
      verifySignature();
    }
  }, [checkUser, signature]);
  useEffect(() => {
    // console.log(
    //   "!isLoggedIn() && !isAdminLoggedIn()",
    //   !isLoggedIn() && !isAdminLoggedIn()
    // );
    if (!isLoggedIn() && !isAdminLoggedIn()) {
      walletSignSignature();
    }
  }, [address]);
  useEffect(() => {
    if (!isLoggedIn() && address && !isAdminLoggedIn()) {
      signMessageRequest();
    }
  }, [message]);
  useEffect(() => {
    if (!isLoggedIn()) {
      verifySignature();
    }
  }, [signature, checkUser]);
  useEffect(() => {
    if (isLoggedIn() && !isAdminLoggedIn()) {
      checkToken();
    }
    setMounted(true);
  }, []);
  useEffect(() => {
    if (isLoggedIn()) {
      fetchUserProfileData();
    }
  }, [isLoggedIn()]);
  useEffect(() => {
    if (address && isLoggedIn()) {
      fetchUserProfileData();
    }
  }, []);
  return (
    <>
      <div className="sc-btn-top mg-r-12" id="site-header">
        {mounted && walletConnection()}
      </div>
    </>
  );
}

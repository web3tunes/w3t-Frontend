"use client";
import { useEffect, useState } from "react";
import MusicInfoTab from "./MusicInfoTab";
import SetPriceTab from "./SetPriceTab";
import BillingInfoTab from "./BillingInfoTab";
import SendForMinitingTab from "./SendForMinitingTab";
import { arrayContainsValue, toaster } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { isAdminLoggedIn, isLoggedIn } from "@/utils/jwtHelper";

function CreateTabs() {
  const [nft, setNft] = useState({});
  const [activeTab, setActiveTab] = useState(1);
  const [filloutTab, setFiloutTab] = useState<number[]>([1]);
  const router = useRouter();
  const renderTab = () => {
    switch (activeTab) {
      case 1:
        return (
          <MusicInfoTab setActiveTab={setActiveTab} nft={nft} setNft={setNft} />
        );
      case 2:
        return (
          <SetPriceTab setActiveTab={setActiveTab} nft={nft} setNft={setNft} />
        );
      case 3:
        return (
          <BillingInfoTab
            setActiveTab={setActiveTab}
            nft={nft}
            setNft={setNft}
          />
        );
      case 4:
        return (
          <SendForMinitingTab
            setActiveTab={setActiveTab}
            nft={nft}
            setNft={setNft}
          />
        );
      default:
        return (
          <MusicInfoTab setActiveTab={setActiveTab} nft={nft} setNft={setNft} />
        );
    }
  };
  useEffect(() => {
    setFiloutTab((prevNumbers) => [...prevNumbers, activeTab]);
  }, [activeTab]);
  useEffect(() => {
    if (!isLoggedIn() && !isAdminLoggedIn()) {
      toaster("error", "Please connect your wallet");
      router.push("/");
    }
  }, []);

  return (
    <div className="tf-create-item tf-section">
      <div className="ibthemes-container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="form-create-item tab-content">
              <div className="flat-tabs tab-create-item">
                <div className="content-inner sc-card-product">
                  <div className="row">
                    <div className="col-md-4">
                      <h3>Mint your Web3Tune</h3>
                    </div>
                    <div className="col-md-8">
                      <div className="tab-header mb-4">
                        <div
                          className={`step ${
                            arrayContainsValue(filloutTab, 1) ? "active" : ""
                          }`}
                        >
                          {/* <span className="step-count">1</span> */}
                          <span className="step-name">Music Info</span>
                        </div>
                        <div
                          className={`step ${
                            arrayContainsValue(filloutTab, 2) ? "active" : ""
                          }`}
                        >
                          {/* <span className="step-count">1</span> */}
                          <span className="step-name">Set Price</span>
                        </div>
                        <div
                          className={`step ${
                            arrayContainsValue(filloutTab, 3) ? "active" : ""
                          }`}
                        >
                          {/* <span className="step-count">1</span> */}
                          <span className="step-name">Billing Info</span>
                        </div>
                        <div
                          className={`step ${
                            arrayContainsValue(filloutTab, 4) ? "active" : ""
                          }`}
                        >
                          {/* <span className="step-count">1</span> */}
                          <span className="step-name">Send for Minting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {renderTab()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTabs;

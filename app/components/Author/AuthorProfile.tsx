"use client";
import { product1 } from "@/data/product";
import { useEffect, useState } from "react";
import ProductCard6 from "../card/ProductCard6";
import Link from "next/link";
import Image from "next/image";
import { isLoggedIn } from "@/utils/jwtHelper";
import { useRouter } from "next/navigation";
import { isObjectEmpty, toaster } from "@/utils/helper";
import { getRequest } from "@/utils/httpHelper";
import AuthorCard from "./AuthorCard";
import EditAuthProfileModal from "../modal/EditAuthorProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";
import {
  profileActiveTabState,
  setActiveTab,
} from "@/store/slice/userProfileSlice";
import { useUser } from "@/context/UserContext";

const tabs = ["Under Review", "Minted", "Purchased"];

export default function AuthorProfile(): JSX.Element {
  const [getCurrentTab, setCurrentTab] = useState<string>("under review");
  const [allNfts, setAllNfts] = useState<any>({});
  const { address } = useUser();
  const [profileData, setProfileData] = useState<any>({});
  const router = useRouter();
  const { userProfile }: any = useSelector(profileActiveTabState);
  const { activeTab } = userProfile;
  const dispatch = useDispatch();
  // tab handler
  const tabHandler = (select: string) => {
    setCurrentTab(select);
    dispatch(setActiveTab(select));
  };
  const userNfts = async () => {
    dispatch(setLoading(true));
    const response: any = await getRequest("user/userNfts");
    console.log(response);
    if (response.statusCode === 200) {
      const { nfts } = response.data;
      setAllNfts(nfts);
    }
    dispatch(setLoading(false));
  };
  const renderTab = () => {
    console.log(!isObjectEmpty(allNfts), allNfts);
    if (!isObjectEmpty(allNfts)) {
      const { underReview, minted, purchased } = allNfts;
      if (getCurrentTab === "under review") {
        return underReview?.map((item: any, index: any) => {
          console.log(item);
          return (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <AuthorCard data={item} />
            </div>
          );
        });
      } else if (getCurrentTab === "minted") {
        return minted?.map((item: any, index: any) => {
          return (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <AuthorCard data={item} />
            </div>
          );
        });
      } else if (getCurrentTab === "purchased") {
        return purchased?.map((item: any, index: any) => {
          return (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <AuthorCard data={item.web3Tune} />
            </div>
          );
        });
      }
    }
  };
  const fetchUserProfileData = async () => {
    dispatch(setLoading(true));
    const response = await getRequest("user/profile");
    if (response.statusCode === 200) {
      const { profile } = response.data;
      setProfileData(profile);
    }
    dispatch(setLoading(false));
  };
  useEffect(() => {
    if (!isLoggedIn()) {
      toaster("error", "Please connect your wallet and sign signature");
      router.push("/");
      return;
    }
    dispatch(setLoading(true));
    fetchUserProfileData();
    userNfts();
  }, []);

  useEffect(() => {
    setCurrentTab(activeTab);
  }, []);

  return (
    <>
      <section className="tf-section authors profile">
        <div className="ibthemes-container">
          <div className="flat-tabs tab-authors">
            <div className="author-profile flex">
              <div className="feature-profile">
                <Image
                  height={300}
                  width={300}
                  // style={{ height: "276px", width: "276px" }}
                  src={
                    // profileData?.profileImage ||
                    "/assets/images/userDefault.png"
                  }
                  alt="Image"
                  className="avatar"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="infor-profile">
                <span>Author Profile</span>
                {/* <h2 className="title">{profileData?.name || "no name"}</h2> */}
                {address && (
                  <form>
                    <input
                      type="text"
                      className="inputcopy"
                      defaultValue={address}
                      readOnly
                    />
                    <button
                      type="button"
                      className="btn-copycode"
                      onClick={() => {
                        if (address) {
                          navigator.clipboard.writeText(address);
                        }
                      }}
                    >
                      <i className="icon-fl-file-1" />
                    </button>
                  </form>
                )}
              </div>
              <div className="widget-social style-3 d-none">
                <ul>
                  <li>
                    <a>
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li className="style-2">
                    <a>
                      <i className="fab fa-telegram-plane" />
                    </a>
                  </li>
                  <li>
                    <a>
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                  <li className="mgr-none">
                    <a>
                      <i className="icon-fl-tik-tok-2" />
                    </a>
                  </li>
                </ul>
                <div className="btn-profile">
                  <Link href="/login" className="sc-button style-1 follow">
                    Follow
                  </Link>
                </div>
              </div>
              <div className="pr-1">
                <Link
                  href={"/create-item"}
                  className="sc-button loadmore pen fl-button pri-3"
                >
                  <span>Upload Track</span>
                </Link>
              </div>
              <div>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#editAuthorProfilePopup"
                  className="sc-button loadmore pen fl-button pri-3"
                >
                  <span>Edit profile</span>
                </button>
              </div>
            </div>
            <ul className="menu-tab flex justify-content-center">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => tabHandler(tab.toLocaleLowerCase())}
                  className={`tablinks ${
                    tab.toLocaleLowerCase().includes(getCurrentTab)
                      ? "active"
                      : ""
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <div className="content-tab active">
              <div className="row">
                {/* {product1
                  .filter((item) =>
                    getCurrentTab === "Under Review"
                      ? item
                      : item.type === getCurrentTab
                  )
                  .slice(0, 8)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="col-xl-3 col-lg-4 col-md-6 col-12"
                    >
                      <ProductCard6 data={item} />
                    </div>
                  ))} */}

                {renderTab()}
              </div>
            </div>
            <div className="col-md-12 wrap-inner load-more text-center d-none">
              <Link
                href="/authors-2"
                className="sc-button loadmore fl-button pri-3"
              >
                <span>Load More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <EditAuthProfileModal
        profile={profileData}
        fetchUserProfileData={fetchUserProfileData}
      />
    </>
  );
}

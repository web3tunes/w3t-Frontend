"use client";
import { product1 } from "@/data/product";
import { useEffect, useState } from "react";
import ProductCard6 from "../../../card/ProductCard6";
import Link from "next/link";
import Image from "next/image";
import { isAdminLoggedIn, isLoggedIn } from "@/utils/jwtHelper";
import { useRouter } from "next/navigation";
import { getBNBToAUD, isObjectEmpty, toaster } from "@/utils/helper";
import { getAdminRequest, getRequest } from "@/utils/httpHelper";
import AdminCard from "./AdminCard";
import MintedAdminCard from "./MintedAdminCard";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";
import UserCard from "./UserCard";
import SoldNFTsCard from "./SoldNFTsCard";
import { useUser } from "@/context/UserContext";
import AdminTable from "./AdminTable";

const tabs = ["Admins", "Pending", "Minted", "Users", "Sold NFTs"];

export default function AdminProfile(): JSX.Element {
  const [getCurrentTab, setCurrentTab] = useState<string>("pending");
  const [allNfts, setAllNfts] = useState<any>({});
  const [audPrice, setAudPrice] = useState(0);
  const { address } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  // tab handler
  const tabHandler = (select: string) => {
    setCurrentTab(select);
  };
  const userNfts = async () => {
    dispatch(setLoading(true));
    const response: any = await getAdminRequest("getNfts");
    const aPrice = await getBNBToAUD();
    setAudPrice(aPrice.AUD);
    console.log(response);
    if (response.statusCode === 200) {
      setAllNfts(response.data);
    }
    dispatch(setLoading(false));
  };
  const renderTab = () => {
    console.log(!isObjectEmpty(allNfts), allNfts);
    if (!isObjectEmpty(allNfts)) {
      const { pending, minted, soldNFTs, user, adminDetails } = allNfts;
      if (getCurrentTab === "pending") {
        return pending?.map((item: any, index: any) => {
          console.log(item);
          return (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <AdminCard data={item} />
            </div>
          );
        });
      } else if (getCurrentTab === "minted") {
        return minted?.map((item: any, index: any) => {
          return (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <MintedAdminCard data={item?.web3Tune} />
            </div>
          );
        });
      } else if (getCurrentTab === "users") {
        return <UserCard user={user} />;
      } else if (getCurrentTab === "sold nfts") {
        return <SoldNFTsCard soldNFTs={soldNFTs} audPrice={audPrice} />;
      } else if (getCurrentTab === "admins") {
        return <AdminTable admins={adminDetails} />;
      }
    }
  };
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      toaster("error", "Please connect your wallet and sign signature");
      router.push("/");
    }
    userNfts();
  }, []);

  return (
    <>
      <section className="tf-section authors profile">
        <div className="ibthemes-container">
          <div className="admin-cards row">
            <div className="col-md-3">
              <div
                className="sc-card-product explode d-flex justify-content-between"
                onClick={() => setCurrentTab("admins")}
              >
                <div className="left">
                  <i className="fa fa-user-circle" />
                  <h4>Admins</h4>
                </div>
                <span className="count">
                  {allNfts?.adminDetails?.length || 0}
                </span>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="sc-card-product explode d-flex justify-content-between"
                onClick={() => setCurrentTab("users")}
              >
                <div className="left">
                  <i className="fa fa-user-circle" />
                  <h4>Users</h4>
                </div>
                <span className="count">{allNfts?.userCount || 0}</span>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="sc-card-product explode d-flex justify-content-between"
                onClick={() => setCurrentTab("minted")}
              >
                <div className="left">
                  <i className="fa fa-music" />
                  <h4>Minted NFTs</h4>
                </div>
                <span className="count">{allNfts?.minted?.length || 0}</span>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="sc-card-product explode d-flex justify-content-between"
                onClick={() => setCurrentTab("sold nfts")}
              >
                <div className="left">
                  <i className="fa fa-music" />
                  <h4>Sold NFTs</h4>
                </div>
                <span className="count">{allNfts?.soldCount || 0}</span>
              </div>
            </div>
          </div>
          <div className="flat-tabs tab-authors">
            <div className="author-profile flex d-none">
              <div className="feature-profile">
                <Image
                  height={500}
                  width={500}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  src="/assets/images/avatar/avt-author-tab.jpg"
                  alt="Image"
                  className="avatar"
                />
              </div>
              <div className="infor-profile">
                <span>Author Profile</span>
                <h2 className="title">Trista Francis</h2>
                <p className="content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                  deleniti asperiores sit.
                </p>
                <form>
                  <input
                    type="text"
                    className="inputcopy"
                    defaultValue={address!}
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
    </>
  );
}

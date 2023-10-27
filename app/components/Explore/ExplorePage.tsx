"use client";
import { product3 } from "@/data/product";
import { useEffect, useState } from "react";
import Dropdown1 from "../dropdown/Dropdown1";
import ExploreCard from "./ExploreCard";
import { useDispatch } from "react-redux";
import ExploreDropdown from "./ExploreDropdown";
import { getRequest } from "@/utils/httpHelper";
import { setLoading } from "@/store/slice/loadingSlice";
import { isObjectEmpty } from "@/utils/helper";
const tabs = ["All", "Single Copy", "Multiple Copies"];

export default function ExplorePage() {
  const [getCurrentTab, setCurrentTab] = useState<string>("all");

  const [getItem, setItem] = useState<number>(8);
  const [nftsData, setNFTsData] = useState<any>({});
  const [type, setType] = useState(0);
  const [sortBy, setSortBy] = useState("desc");
  const dispatch = useDispatch();
  const tabHandler = (select: string) => {
    setCurrentTab(select);
  };
  // load more handler
  const loadMoreHandler = () => {
    if (product3.length > getItem) {
      setItem(getItem + 4);
    }
  };

  const typeChangeHandler = (value: any) => {
    setType(value);
    fetchNftsDetails(value, sortBy);
  };
  const sortChangeHandler = (value: any) => {
    setSortBy(value);
    fetchNftsDetails(type, value);
  };
  const fetchNftsDetails = async (type = 0, sortBy = "desc") => {
    // if(type === 0)
    dispatch(setLoading(true));
    const response = await getRequest(`user/explore`);
    console.log(response);
    if (response.statusCode === 200) {
      const { nfts } = response.data;
      setNFTsData(nfts);
    }
    dispatch(setLoading(false));
  };
  const renderTab = () => {
    if (!isObjectEmpty(nftsData)) {
      const { all, singleCopy, multipleCopies } = nftsData;
      if (getCurrentTab === "all") {
        return all?.map((item: any, index: any) => {
          return (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <ExploreCard data={item} />
            </div>
          );
        });
      } else if (getCurrentTab === "single_copy") {
        return singleCopy?.map((item: any, index: any) => {
          return (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <ExploreCard data={item} />
            </div>
          );
        });
      } else if (getCurrentTab === "multiple_copies") {
        return multipleCopies?.map((item: any, index: any) => {
          return (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <ExploreCard data={item} />
            </div>
          );
        });
      }
    }
  };
  useEffect(() => {
    fetchNftsDetails();
  }, []);
  return (
    <>
      <div className="tf-section sc-explore-1 explore">
        <div className="ibthemes-container">
          <div className="flat-tabs tab-authors">
            <ul className="menu-tab flex justify-content-center">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  onClick={() =>
                    tabHandler(tab.toLocaleLowerCase().replace(/ /g, "_"))
                  }
                  className={`tablinks ${
                    tab
                      .toLocaleLowerCase()
                      .replace(/ /g, "_")
                      .includes(getCurrentTab)
                      ? "active"
                      : ""
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>

            <div className="content-tab active">
              <div className="row">{renderTab()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

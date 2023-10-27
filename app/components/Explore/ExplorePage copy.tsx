"use client";
import { product3 } from "@/data/product";
import { useEffect, useState } from "react";
import Dropdown1 from "../dropdown/Dropdown1";
import ExploreCard from "./ExploreCard";
import { useDispatch } from "react-redux";
import ExploreDropdown from "./ExploreDropdown";
import { getRequest } from "@/utils/httpHelper";
import { setLoading } from "@/store/slice/loadingSlice";

export default function ExplorePage() {
  const [getItem, setItem] = useState<number>(8);
  const [nftsData, setNFTsData] = useState([]);
  const [type, setType] = useState(0);
  const [sortBy, setSortBy] = useState("desc");
  const dispatch = useDispatch();
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
    const response = await getRequest(
      `user/explore?type=${type}&sortBy=${sortBy}`
    );
    if (response.statusCode === 200) {
      const { nfts } = response.data;
      setNFTsData(nfts);
    }
    dispatch(setLoading(false));
  };
  useEffect(() => {
    fetchNftsDetails();
  }, []);
  return (
    <>
      <div className="tf-section sc-explore-1">
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-md-12">
              <div className="wrap-box explore-1 flex mg-bt-40">
                <div className="seclect-box style-1">
                  <ExploreDropdown
                    id="all-items"
                    defaultSelect="All Items"
                    data={[
                      { name: "Single Items", value: 0 },
                      { name: "Bundles", value: 1 },
                    ]}
                    changeHandler={typeChangeHandler}
                  />
                </div>
                <div className="seclect-box style-2 box-right">
                  <ExploreDropdown
                    id="sort-by"
                    defaultSelect="Sort by"
                    data={[
                      { name: "Asc", value: "asc" },
                      { name: "Desc", value: "desc" },
                    ]}
                    changeHandler={sortChangeHandler}
                  />
                </div>
              </div>
            </div>
            {nftsData?.length ? (
              nftsData.map((item: any) => (
                <div
                  key={item.id}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <ExploreCard data={item} />
                </div>
              ))
            ) : (
              <div>
                <strong>No data found</strong>
              </div>
            )}
            {/* {product3.length > getItem && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <button
                  onClick={loadMoreHandler}
                  id="loadmore"
                  className="sc-button loadmore fl-button pri-3"
                >
                  <span>Load More</span>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

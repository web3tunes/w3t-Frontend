"use client";
import { CURRENCY_SYMBOL, TOKEN_SYMBOL } from "@/utils/constant";
import { getBNBToAUD } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  data: {
    id: number;
    status: string;
    hert: number;
    img: string;
    title: string;
    tag: string;
    eth: number;
    author: {
      name: string;
      avatar: string;
    };
  };
}

export default function ExploreCard({ data }: any): JSX.Element {
  const [isHeartToggle, setHeartToggle] = useState<number>(0);
  const [priceInAUD, setPriceInAUD] = useState(1);
  console.log(data);
  // heart toggle
  const heartToggle = () => {
    if (isHeartToggle === 0) {
      return setHeartToggle(1);
    }
    setHeartToggle(0);
  };

  useEffect(() => {
    const doAsync = async () => {
      const prices = await getBNBToAUD();
      setPriceInAUD(prices.AUD);
    };
    doAsync();
  }, []);

  return (
    <>
      <div className="sc-card-product">
        <div className="card-media">
          <Link href={`/nft/${data?.id}`}>
            <Image
              height={500}
              width={500}
              src={
                data?.coverImage
                  ? data.coverImage
                  : "/assets/images/default.png"
              }
              alt="Image"
            />
          </Link>
          {/* {data.status === "Coming Soon" ? (
            <div className="coming-soon">coming soon</div>
          ) : undefined} */}

          {/* <button
            onClick={heartToggle}
            className={`wishlist-button heart ${
              isHeartToggle === 1 ? "active" : ""
            } `}
          >
            <span className="number-like">{data.hert + isHeartToggle}</span>
          </button> */}
        </div>
        <div className="card-title">
          <h5 className="style2">
            <Link href={`/nft/${data?.id}`}>{data?.name}</Link>
          </h5>
          {/* <div className="tags">{data.tag}</div> */}
        </div>
        <div className="meta-info">
          <div className="author">
            <div className="avatar">
              <Image
                height={100}
                width={100}
                src={
                  data?.walletUser.profileImage
                    ? data?.walletUser.profileImage
                    : "/assets/images/userDefault.png"
                }
                alt="Image"
              />
            </div>
            <div className="info">
              <span>Created By</span>
              <h6>
                <Link href="#">{data?.artistName || "no name"}</Link>
              </h6>
            </div>
          </div>
          <div className="price">
            <span>Price</span>
            <div>
              <h5>
                {" "}
                {data?.price} {TOKEN_SYMBOL}
              </h5>
              <h5>
                {" "}
                {(data?.price * priceInAUD).toFixed(2)} {CURRENCY_SYMBOL}
              </h5>
            </div>
          </div>
        </div>
        <div className="card-bottom">
          <Link href={`/nft/${data?.id}`} className="view-history reload">
            View
          </Link>
        </div>
      </div>
    </>
  );
}

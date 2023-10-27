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

export default function AdminCard({ data }: any): JSX.Element {
  const [isHeartToggle, setHeartToggle] = useState<number>(0);
  const [priceInAUD, setPriceInAUD] = useState(1);

  // heart toggle
  const heartToggle = () => {
    if (isHeartToggle === 0) {
      return setHeartToggle(1);
    }
    setHeartToggle(0);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    const doAsync = async () => {
      const prices = await getBNBToAUD();
      setPriceInAUD(prices.AUD);
    };
    doAsync();
  }, []);
  return (
    <>
      <div className="sc-card-product admin-card">
        <div className="card-media">
          <Link href={`/nft/${data?.id}`}>
            <Image
              height={500}
              width={500}
              src={data?.coverImage}
              alt="Image"
            />
          </Link>
        </div>
        <div className="card-title">
          <h5 className="style2">
            <Link href={`/nft/${data.id}`}>{data?.name}</Link>
          </h5>
        </div>
        <div className="meta-info">
          <div className="author">
            <div className="avatar">
              <Image
                height={100}
                width={100}
                src={
                  data?.walletUser?.profileImage
                    ? data?.walletUser?.profileImage
                    : "/assets/images/userDefault.png"
                }
                alt="Image"
              />
            </div>
            <div className="info">
              <span>Creator</span>
              <h6>
                <Link href="#">{data?.artistName}</Link>
              </h6>
            </div>
          </div>
          <div className="price">
            <span>Current Bid</span>
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
        <div className="card-bottom">
          <Link
            href={`/admin/edit/${data?.id}`}
            className="sc-button style bag fl-button pri-3"
          >
            <span>Edit</span>
          </Link>
          <Link href={`/nft/${data?.id}`} className="view-history reload">
            View
          </Link>
        </div>
      </div>
    </>
  );
}

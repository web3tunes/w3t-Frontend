import NFTDetailPage from "@/app/components/block/nft/NFTDetailPage";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
  title: "NFT Details",
  breadcrumb: [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Explore",
      path: "/item-details-2",
    },
    {
      name: "Item Details 2",
    },
  ],
};

export const metadata: Metadata = {
  title: "Web3Tunes | NFT Marketplace | Item Details ",
};

export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <NFTDetailPage />
    </>
  );
}

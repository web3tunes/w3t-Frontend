import { Metadata } from "next";
import Breadcrumb from "../components/breadcrumb";
import CreateItem from "../components/block/CreateItem";
import LiveAuctionModal from "../components/modal/LiveAuctionModal";
import CreateTabs from "../components/block/createTabs/Index";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toaster } from "@/utils/helper";
import ArtistAndLabelsPage from "../components/block/artistAndLabels";

const item = {
  title: "Artists & Labels",
  breadcrumb: [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Page",
      path: "/create-item",
    },
    {
      name: "Create Item",
    },
  ],
};

export const metadata: Metadata = {
  title: "Web3Tunes | NFT Marketplace | Artist And Labels",
};

export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <ArtistAndLabelsPage />
    </>
  );
}

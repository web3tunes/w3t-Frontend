import ExplorePage from "@/app/components/Explore/ExplorePage";
import Breadcrumb from "@/app/components/breadcrumb";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

const item = {
  title: "Explore UDCs",
  breadcrumb: [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Explore",
      path: "/explore-1",
    },
    {
      name: "Explore 1",
    },
  ],
};

export const metadata: Metadata = {
  title: "Web3Tunes | NFT Marketplace | Explore ",
};

export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <ExplorePage />

      {/* live auction product modal */}
      <LiveAuctionModal />
    </>
  );
}

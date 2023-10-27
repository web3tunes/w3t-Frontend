import { Metadata } from "next";
import Breadcrumb from "../components/breadcrumb";
import LiveAuctionModal from "../components/modal/LiveAuctionModal";
import CreateTabs from "../components/block/createTabs/Index";

const item = {
  title: "Create Item",
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
  title: "Web3Tunes | NFT Marketplace | Create Item",
};

export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <CreateTabs />

      {/* live auction product modal */}
      <LiveAuctionModal />
    </>
  );
}

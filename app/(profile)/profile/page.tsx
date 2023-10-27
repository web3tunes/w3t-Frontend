import AuthorProfile from "@/app/components/Author/AuthorProfile";
import Breadcrumb from "@/app/components/breadcrumb";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

const item = {
  title: "Profile",
};
export const metadata: Metadata = {
  title: "Web3tunes - User Profile",
};

export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <AuthorProfile />

      {/* live auction product modal */}
      <LiveAuctionModal />
    </>
  );
}

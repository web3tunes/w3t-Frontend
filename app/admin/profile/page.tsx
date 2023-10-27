import Activity1 from "@/app/components/block/Activity1";
import AdminProfile from "@/app/components/block/admin/Profile/AdminProfile";
import MintPage from "@/app/components/block/admin/mintPage/MintPage";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
  title: "Admin Panel",
  breadcrumb: [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Community",
      path: "/activity-1",
    },
    {
      name: "Activity 1",
    },
  ],
};

export const metadata: Metadata = {
  title: "Web3Tunes | NFT Marketplace | Admin Profile",
};

export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <AdminProfile />
    </>
  );
}

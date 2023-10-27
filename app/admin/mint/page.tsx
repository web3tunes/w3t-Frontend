import Activity1 from "@/app/components/block/Activity1";
import MintPage from "@/app/components/block/admin/mintPage/MintPage";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
  title: "Activity 1",
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
  title: "Axies | NFT Marketplace React/Next Js Template | Activity 1",
};

export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <MintPage />
    </>
  );
}

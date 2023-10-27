import AdminEditPage from "@/app/components/block/admin/edit";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
  title: "Edit",
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
      <AdminEditPage />
    </>
  );
}

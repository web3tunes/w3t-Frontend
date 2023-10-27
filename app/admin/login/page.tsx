import AdminLogin from "@/app/components/block/admin/AdminLogin";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
  title: "Admin Login",
  breadcrumb: [
    {
      name: "",
    },
  ],
};

export const metadata: Metadata = {
  title: "Web3Tunes | NFT Marketplace | Admin Login",
};
export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <AdminLogin />
    </>
  );
}

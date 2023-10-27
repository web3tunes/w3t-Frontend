import Contact2 from "@/app/components/block/Contact2";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
  title: "Contact Us",
};

export const metadata: Metadata = {
  title: "Web3Tunes | NFT Marketplace | Contact Us",
};

export default function page(): JSX.Element {
  return (
    <>
      <Breadcrumb data={item} />
      <Contact2 />
    </>
  );
}

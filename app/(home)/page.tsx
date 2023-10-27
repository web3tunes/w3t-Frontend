// "use client";
import { Metadata } from "next";
import CreateSellNft from "../components/block/CreateSellNft";
import LiveAuction from "../components/block/LiveAuction";
import Hero1 from "../components/hero/Hero1";
import LiveAuctionModal from "../components/modal/LiveAuctionModal";
import HomeDetailsSection from "../components/block/home/HomeDetailsSection";
import OurMegaFanOfferings from "../components/block/OurMegaFanOfferings";

export const metadata: Metadata = {
  title:
    "Web3tunes - Unique digital collectible marketplace for Australian & new Zealand muso's & labels",
};

export default function page() {
  // const { address } = useAccount();
  // const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
  //   message: signTextMessage(address, "96516577-25dd-4461-88b4-476984e58ac2"),
  // });
  // const test = async () => {
  //   const response = await getRequest("user/nonce");
  //   console.log(response);
  // };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <>
      <Hero1 />
      {/* <button onClick={() => test()}>Sign Message</button> */}
      <LiveAuction />
      {/* <TopSeller /> */}
      {/* <TodaysPicks style="pad-b-54 no-pt-mb" /> */}
      {/* <PopularCollection /> */}
      <HomeDetailsSection />
      <CreateSellNft />
      <OurMegaFanOfferings />
      {/* live auction product modal */}
      <LiveAuctionModal />
    </>
  );
}

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import ProductCard1 from "../card/ProductCard1";
import { product1 } from "@/data/product";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";
import { getRequest } from "@/utils/httpHelper";
import ExploreCard from "../Explore/ExploreCard";

export default function LiveAuctionElement(): JSX.Element {
  const [nftsData, setNFTsData] = useState<any>({});
  const dispatch = useDispatch();
  const fetchNftsDetails = async (type = 0, sortBy = "desc") => {
    // if(type === 0)
    dispatch(setLoading(true));
    const response = await getRequest(`user/explore`);
    if (response.statusCode === 200) {
      const { nfts } = response.data;
      setNFTsData(nfts);
    }
    dispatch(setLoading(false));
  };
  useEffect(() => {
    fetchNftsDetails();
  }, []);
  return (
    <>
      <div className="col-md-12">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".live-auction-next",
            nextEl: ".live-auction-right",
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              (swiper.params.navigation as any).prevEl = ".live-auction-right";
              (swiper.params.navigation as any).nextEl = ".live-auction-next";

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper swiper-container show-shadow carousel pad-t-17 auctions"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {nftsData?.all?.map((item: any) => (
            <SwiperSlide key={item.id}>
              <ExploreCard data={item} />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination mg-t-6" />
          <div className="swiper-button-next live-auction-next btn-slide-next active" />
          <div className="swiper-button-prev live-auction-right btn-slide-prev" />
        </Swiper>
      </div>
    </>
  );
}

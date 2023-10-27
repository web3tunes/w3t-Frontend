"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import useDarkModeCheck from "@/hooks/useDarkModeCheck";
import Link from "next/link";
import Image from "next/image";

export default function HeroSlider1(): JSX.Element {
  // is dark hook
  const isDark = useDarkModeCheck();

  return (
    <>
      <div className="swiper-container mainslider home auctions">
        <div className="swiper-wrapper">
          <Swiper
            slidesPerView={1}
            loop={true}
            navigation={{
              prevEl: ".swiper-button-next",
              nextEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            autoplay={{
              delay: 15000,
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                (swiper.params.navigation as any).prevEl =
                  ".swiper-button-prev";
                (swiper.params.navigation as any).nextEl =
                  ".swiper-button-next";

                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            <SwiperSlide>
              <div className="swiper-slide">
                <div className="slider-item">
                  <div className="ibthemes-container ">
                    <div className="wrap-heading flat-slider flex">
                      <div className="content">
                        <h2 className="heading">
                          Discover and connect with your favourite
                        </h2>
                        <h1 className="heading mb-style">
                          <span
                            className={`tf-text ${isDark ? "s1" : "style"}`}
                          >
                            AUS-NZ musicians
                          </span>
                        </h1>
                        <h1 className="heading">Digital Music NFTs</h1>
                        <p className="sub-heading mg-t-29 mg-bt-44">
                          The future of Muso-Fan engagement has arrived
                        </p>
                        <div className="flat-bt-slider flex style2">
                          <Link
                            href="/explore"
                            className="sc-button header-slider style style-1 rocket fl-button pri-1"
                          >
                            <span>Market</span>
                          </Link>
                          <Link
                            href="/contact"
                            className="sc-button header-slider style style-1 note fl-button pri-1"
                          >
                            <span>Muso Registration</span>
                          </Link>
                        </div>
                      </div>
                      <div className="image">
                        <Image
                          height={448}
                          width={620}
                          className="img-bg"
                          src="/assets/images/backgroup-secsion/img-bg-sliderhome2.png"
                          alt="Image"
                        />
                        <Image
                          height={588}
                          width={354}
                          src="/assets/images/hero/web3tunes-music-nft-banner-1.png"
                          alt="Image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* item*/}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-slide">
                <div className="slider-item">
                  <div className="ibthemes-container">
                    <div className="wrap-heading flat-slider text-center two">
                      <h2 className="heading">
                        Creating new revenue opportunities for
                      </h2>
                      <h1 className="heading">
                        <span className={`tf-text ${isDark ? "s1" : "style"}`}>
                          AUS-NZ{" "}
                        </span>
                        <span>Muso’s</span>
                      </h1>
                      <p className="sub-heading mg-t-29 mg-bt-50">
                        Every muso should have the opportunity to make a living
                        from their talent
                      </p>
                      <div className="flat-bt-slider flex">
                        <Link
                          href="/explore"
                          className="sc-button header-slider style style-1 rocket fl-button pri-1"
                        >
                          <span>Market</span>
                        </Link>
                        <Link
                          href="/contact"
                          className="sc-button header-slider style style-1 note fl-button pri-1"
                        >
                          <span>Muso Registration</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* item*/}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-slide">
                <div className="slider-item">
                  <div className="ibthemes-container flex">
                    <div className="image three">
                      <Image
                        height={395}
                        width={573}
                        src="/assets/images/box-item/imgslider-3.png"
                        alt="Image"
                      />
                      <Image
                        height={460}
                        width={705}
                        className="img-bg"
                        src="/assets/images/backgroup-secsion/img-bg-sliderhome3.png"
                        alt="Image"
                      />
                    </div>
                    <div className="wrap-heading flat-slider h3 three">
                      <h2 className="heading">Connecting Muso’s with</h2>
                      <h2 className="heading">Fans</h2>
                      <h2 className="heading h3">
                        not
                        <span className="fill">Followers</span>
                      </h2>
                      <p className="sub-heading mt-29 mb-35">
                        Less than 1,000 Mega-Fans can support the livelihood of
                        one of our muso’s
                      </p>
                      <div className="flat-bt-slider flex style2">
                        <Link
                          href="/explore"
                          className="sc-button header-slider style style-1 rocket fl-button pri-1"
                        >
                          <span>Market</span>
                        </Link>
                        <Link
                          href="/contact"
                          className="sc-button header-slider style style-1 note fl-button pri-1"
                        >
                          <span>Muso Registration</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* item*/}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="swiper-pagination" />
      </div>
      <div className="swiper-button-next btn-slide-next active" />
      <div className="swiper-button-prev btn-slide-prev" />
    </>
  );
}

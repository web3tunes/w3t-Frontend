"use client";
import Link from "next/link";
import Navigation from "./Navigation";
import Mode from "./Mode";
import useDarkModeCheck from "@/hooks/useDarkModeCheck";
import { usePathname } from "next/navigation";
import useStickyMenu from "@/hooks/useStickyMenu";
import Search2 from "./Search2";
import WalletConnectButton from "../button/WalletConnectButton";
import Image from "next/image";

export default function Header(): JSX.Element {
  const path = usePathname();

  // is dark hook
  const isDark = useDarkModeCheck();

  // sticky menu
  const isSticky1 = useStickyMenu(200);
  const isSticky2 = useStickyMenu(250);

  return (
    <>
      <header
        id="header_main"
        className={`header_1 js-header style  ${isSticky1 ? "is-fixed" : ""} ${
          isSticky2 ? "is-small" : ""
        }`}
      >
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-md-12">
              <div id="site-header-inner">
                <div className="wrap-box flex">
                  <div id="site-logo" className="clearfix">
                    <div id="site-logo-inner">
                      <Link href="/" rel="home" className="main-logo">
                        <Image
                          id="logo_header"
                          src={`/assets/images/logo/web3tunes-logo.svg`}
                          alt="nft-gaming"
                          width={100}
                          height={80}
                        />
                      </Link>
                    </div>
                  </div>
                  <div
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    className="mobile-button "
                  >
                    <span />
                  </div>
                  <Navigation />

                  <div className="flat-search-btn flex">
                    {/* search bar 2 */}
                    <Search2 />
                    <WalletConnectButton />
                    {/* wallet */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Mode />
      </header>
    </>
  );
}

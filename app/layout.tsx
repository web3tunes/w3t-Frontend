"use client";
import { Rubik, Urbanist } from "next/font/google";
// Wallet Connect
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

import NextNProgress from "nextjs-progressbar";

import Header from "./components/header";
import { Providers } from "./providers";
import Footer from "./components/footer";
import BackToTop from "./components/button/BackToTop";
import "./../public/assets/css/style.css";
import "./../public/assets/css/responsive.css";
import "react-loading-skeleton/dist/skeleton.css";
import MobileNavigation from "./components/header/MobileNavigation";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Web3Provider } from "@/context/Web3Context";
import { UserProvider } from "@/context/UserContext";

if (typeof window !== "undefined") {
  import("bootstrap");
}

// rubic font
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--rubik-font",
});

// urbanist font
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--urbanist-font",
});
const projectId = "c5b5a752e1743bf04e2e12e1d65930cd";
// const chains = [polygonMumbai];

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient,
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <html lang="en">
      <body className={`body ${rubik.className} ${urbanist.className}`}>
        <Provider store={store}>
          <Web3Provider>
            <UserProvider>
              {/* <WagmiConfig config={wagmiConfig}> */}
              <Providers>
                <Suspense fallback={<Loading />}>
                  <div id="wrapper">
                    <div id="page" className="clearfix">
                      <Toaster
                        position="top-center"
                        reverseOrder={false}
                        toastOptions={{
                          className: "",
                          style: {
                            border: "1px solid #713200",
                            padding: "10px",
                            fontSize: "20px",
                            wordBreak: "break-all",
                            maxWidth: 800,
                            zIndex: 9,
                          },
                        }}
                      />
                      <Header />
                      {/* mobile sidebar navigation */}
                      <MobileNavigation />
                      {children}
                      {/* if the route path is /home-8 then the footer will not show */}
                      <Footer />
                    </div>
                  </div>
                  <BackToTop />
                </Suspense>
              </Providers>
              {/* </WagmiConfig> */}
            </UserProvider>
          </Web3Provider>
          {/* <GoogleOAuthProvider clientId="527196420471-ear86gerkldn49ofvukjgj9r7qgeerlv.apps.googleusercontent.com">
          </GoogleOAuthProvider> */}
        </Provider>
      </body>
    </html>
  );
}

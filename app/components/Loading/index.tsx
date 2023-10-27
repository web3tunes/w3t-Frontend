"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  // const router = useRouter();
  // useEffect(() => {
  //   const handleStart = (url: any) => url !== router.asPath && console.log(url);
  //   const handleComplete = (url: any) =>
  //     url === router.asPath && console.log(url);

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // });
  // You can add any UI inside Loading, including a Skeleton.
  return <Skeleton count={5} />;
}

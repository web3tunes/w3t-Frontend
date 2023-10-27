import { Metadata } from "next";
import React from "react";
import Breadcrumb from "../components/breadcrumb";
import PrivacyPolicyPage from "../components/privacy-policy";
const item = {
  title: "Privacy Policy",
};
export const metadata: Metadata = {
  title: "Web3tunes - Privacy Policy",
};

export default function TermsAndConditions() {
  return (
    <>
      <Breadcrumb data={item} />
      <PrivacyPolicyPage />
    </>
  );
}

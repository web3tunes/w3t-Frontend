import { Metadata } from "next";
import React from "react";
import Breadcrumb from "../components/breadcrumb";
import TermsAndConditionsPage from "../components/TermsAndConditionsPage";
const item = {
  title: "Terms And Conditions",
};
export const metadata: Metadata = {
  title: "Web3tunes - Terms And Conditions",
};

export default function TermsAndConditions() {
  return (
    <>
      <Breadcrumb data={item} />
      <TermsAndConditionsPage />
    </>
  );
}

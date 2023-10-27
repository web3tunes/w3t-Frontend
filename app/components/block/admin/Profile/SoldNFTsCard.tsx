import { CURRENCY_SYMBOL, TOKEN_SYMBOL } from "@/utils/constant";
import { getBNBToAUD } from "@/utils/helper";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function SoldNFTsCard({
  soldNFTs,
  audPrice,
}: {
  soldNFTs: any;
  audPrice: any;
}) {
  return (
    <div className="sc-card-activity style1 w-100">
      <div className="content">
        <table className="table responsive">
          <thead>
            <tr>
              <th>Name</th>
              <th>No. of Copies</th>
              <th>
                Price {TOKEN_SYMBOL} / {CURRENCY_SYMBOL}
              </th>
              <th>Sold Date</th>
              <th>Wallet Address</th>
            </tr>
          </thead>
          <tbody>
            {soldNFTs?.map((val: any, index: any) => {
              return (
                <tr key={index}>
                  <td>{val?.web3Tune?.name}</td>
                  <td>{val?.soldQuantity}</td>
                  <td>
                    {val?.paidPrice + " " + TOKEN_SYMBOL} /{" "}
                    {parseFloat(val?.paidPrice) * audPrice +
                      " " +
                      CURRENCY_SYMBOL}
                  </td>
                  <td>
                    {moment(val?.createdAt).format("DD MMM YYYY hh:mm a")}
                  </td>
                  <td>{val?.walletUser?.web3Address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

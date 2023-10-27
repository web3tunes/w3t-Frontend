"use client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const tabs: string[] = ["Info", "Artist", "Project", "License Details"];

export default function NFTDetailsTab({
  nftDetails,
}: {
  nftDetails: any;
}): JSX.Element {
  const [getCurrentTab, setCurrentTab] = useState<number>(0);

  // tab handler
  const tabHandler = (select: number) => {
    setCurrentTab(select);
  };

  return (
    <>
      <div className="flat-tabs themesflat-tabs">
        <ul className="menu-tab tab-title">
          {tabs.map((item, index) => (
            <li
              onClick={() => tabHandler(index)}
              key={index}
              className={`item-title ${
                index === getCurrentTab ? "active" : ""
              }`}
            >
              <span className="inner">{item}</span>
            </li>
          ))}
        </ul>
        <div className="content-tab">
          {getCurrentTab === 0 && (
            <div className="content-inner tab-content">
              <ul className="bid-history-list">
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Track #:</span>
                      <span className="item-des">{nftDetails?.trackNo}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Genre:</span>
                      <span className="item-des">{nftDetails?.genre}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">BPM:</span>
                      <span className="item-des">{nftDetails?.bpm}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">External URL:</span>
                      <span className="item-des">
                        {nftDetails?.externalUrl}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Duration:</span>
                      <span className="item-des">{nftDetails?.duration}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Release date:</span>
                      <span className="item-des">
                        {moment(nftDetails?.releaseDate).format("MMM Do YYYY")}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Record label (track):</span>
                      <span className="item-des">
                        {nftDetails?.recordLabel}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Publisher (track):</span>
                      <span className="item-des">
                        {nftDetails?.trackPublisher}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Location:</span>
                      <span className="item-des">{nftDetails?.location}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Lyrics:</span>
                      <span className="item-des">{nftDetails?.lyrics}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {getCurrentTab === 1 && (
            <div className="content-inner tab-content">
              <ul className="bid-history-list">
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Name:</span>
                      <span className="item-des">{nftDetails?.artistName}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Email:</span>
                      <span className="item-des">
                        {nftDetails?.artistEmail}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {getCurrentTab === 2 && (
            <div className="content-inner tab-content">
              <ul className="bid-history-list">
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Project Title:</span>
                      <span className="item-des">
                        {nftDetails?.projectTitle}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Project Type:</span>
                      <span className="item-des">
                        {nftDetails?.projectType}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Project Release Date:</span>
                      <span className="item-des">
                        {moment(nftDetails?.projectReleaseDate).format(
                          "MMM Do YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Project Record Label:</span>
                      <span className="item-des">
                        {nftDetails?.projectRecordLabel}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Project Publisher:</span>
                      <span className="item-des">
                        {nftDetails?.projectPublisher}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">Project Description:</span>
                      <span className="item-des">
                        {nftDetails?.projectDescription}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {getCurrentTab === 3 && (
            <div className="content-inner tab-content">
              <ul className="bid-history-list">
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">License:</span>
                      <span className="item-des">{nftDetails?.license}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">ISRC:</span>
                      <span className="item-des">{nftDetails?.isrc}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content">
                    <div className="item-d">
                      <span className="item-head">UPC:</span>
                      <span className="item-des">{nftDetails?.upc}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import Image from "next/image";

export default function HomeDetailsSection() {
  return (
    <section className="tf-box-icon live-auctions style1 tf-section no-pt-mb">
      <div className="ibthemes-container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="heading-live-auctions mg-bt-22 justify-content-center">
              <h2 className="tf-title pb-17">Music UDCs: What Are They?</h2>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <p>
              <span>
                WEB3TUNES creates a unique range of digital collectibles offered
                in the form of a non-fungible token ("NFT")
              </span>
            </p>
            <p>
              <span>
                <br />
              </span>
            </p>
            <p>
              <span>
                It’s no surprise that NFTs are disrupting a wide range of
                businesses, and going by current trends, the future of music
                will be shaped by NFTs in very significant ways.
              </span>
            </p>
            <p>
              <span>
                <br />
              </span>
            </p>
            <p>
              <span>
                NFT means ‘non-fungible token’ - a digital asset that you cannot
                trade for another NFT or any other digital asset. As a result,
                each NFT is truly “one-of-a-kind.”&nbsp;
              </span>
            </p>
            <p>
              <span>
                <br />
              </span>
            </p>
            <p>
              <span>
                NFTs and music can include songs, albums, music, lyrics, and
                soundbites.
              </span>
            </p>
            <p>
              <span>
                <br />
              </span>
            </p>
            <p>
              <span>
                Blockchain technology moves NFTs from one owner to another,
                providing a digital trail to verify the transaction from the
                seller to the buyer. The buyer’s exclusive ownership rights are
                encoded for the new owner.
              </span>
            </p>
            <p>
              <span>
                <br />
              </span>
            </p>
          </div>
          <div className="col-md-6 col-md-web3">
            {/* <div className="p-4 col-md-web3"> */}
            <div className="heading-live-auctions mg-bt-22">
              <h3 className="tf-title pb-17">Why are we doing this?</h3>
            </div>
            <div>
              <p>
                <span>
                  The current music market is dominated by the largest record
                  labels and music streaming platforms, but only about 10-15% of
                  their profits are distributed to the artists.
                </span>
              </p>
              <p>
                <span>
                  It is not an exaggeration to say that the current music market
                  is the playground for a handful of record label giants and
                  music streaming platforms.
                </span>
              </p>
            </div>
            {/* </div> */}
          </div>
          <div className="col-md-6 col-md-web3">
            {/* <div className="p-4 col-md-web3"> */}
            <div className="heading-live-auctions mg-bt-22">
              <h3 className="tf-title pb-17">What is our AIM?</h3>
            </div>
            <ul>
              <li>
                <p>Re-align financial returns for musicians.</p>
              </li>
              <li>
                <p>Simplify a sales channel for new musicians.</p>
              </li>
              <li>
                <p>
                  Provide a pathway for independent record labels to access the
                  web3 music universe.
                </p>
              </li>
              <li>
                <p>Create a new Fan-Artist relationship network.</p>
              </li>
              <li>
                <p>
                  Donate to charity by registering for our Cash Rewards Program
                </p>
              </li>
            </ul>
            {/* </div> */}
          </div>
          <div className="col-md-6 col-md-web3 text-center">
            <div className="heading-live-auctions mg-bt-22 justify-content-center">
              <h3 className="tf-title pb-17">Bringing everyone together</h3>
            </div>
            <Image
              src="/assets/images/home/web3tunes_flow.png"
              alt="web3tunes flow"
              width={"600"}
              height={"500"}
            />
            <div>
              <p>
                <span>
                  Less than 1,000 Mega-Fans can support the livelihood of one of
                  our muso’s
                </span>
              </p>
              <p>
                <span>
                  <br />
                </span>
              </p>
              <p>
                <span>
                  All the while supporting our charities just for liking music
                </span>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-md-web3 text-center">
            <div className="heading-live-auctions mg-bt-22 justify-content-center">
              <h3 className="tf-title pb-17">Loving music & Doing Good</h3>
            </div>
            <Image
              src="/assets/images/home/web3tunes-partner.png"
              alt="web3tunes partner"
              width={500}
              height={200}
            />
            <div>
              <p>
                <span>
                  The biggest problem for charity is finding sustainable income
                  streams that can support their good work. Our partner at
                  “Doing Good Rewards” (“DGR”) have allowed us to create an
                  innovative solution that makes giving to charity easy, simple
                  and part of your everyday lives.
                </span>
              </p>
              <p>
                <span>
                  <br />
                </span>
              </p>
              <p>
                <span>
                  DGR are proud to work with all charitable organisations free
                  of-charge.
                </span>
              </p>
              <p>
                <span>
                  <br />
                </span>
              </p>
              <p>
                <span>
                  Sign up for our Cash Rewards Program at <br />
                  <a
                    href="https://www.doinggoodrewards.com.au/at/web3tunes"
                    target="_blank"
                  >
                    https://www.doinggoodrewards.com.au/at/web3tunes
                  </a>
                  <br />
                  Click “Activate Now” to register
                </span>
              </p>
              <p>
                <span>
                  <br />
                </span>
              </p>
              <p>
                <span>
                  Once you have registered, you can also download the Doing Good
                  app from Google Play or Apple. In the app, click on "Login"
                  and enter the user details you entered at registration.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

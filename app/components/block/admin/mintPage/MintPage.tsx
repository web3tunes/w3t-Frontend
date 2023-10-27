import ActivityCard1 from "@/app/components/card/ActivityCard1";
import SearchBox from "@/app/components/element/SearchBox";
import { activity1 } from "@/data/project";
import Link from "next/link";

export default function MintPage(): JSX.Element {
  return (
    <>
      <section className="tf-activity s1 tf-section">
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              {activity1.map((item) => (
                <ActivityCard1 key={item.id} data={item} />
              ))}

              <div className="btn-activity mg-t-40 center">
                <Link
                  href="/authors-1"
                  className="sc-button loadmore fl-button pri-3"
                >
                  <span>Load More</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

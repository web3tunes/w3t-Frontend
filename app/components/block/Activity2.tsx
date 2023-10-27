import { activity2 } from "@/data/project";
import ActivityCard2 from "../card/ActivityCard2";
import SearchBox from "../element/SearchBox";
import Link from "next/link";

export default function Activity2(): JSX.Element {
  return (
    <>
      <section className="tf-activity tf-section">
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="box-activity">
                {activity2.map((item) => (
                  <ActivityCard2 key={item.id} data={item} />
                ))}
              </div>
              <div className="btn-activity mg-t-10 center">
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

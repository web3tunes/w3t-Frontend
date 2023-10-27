"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { isAdminLoggedIn, isLoggedIn } from "@/utils/jwtHelper";

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn() || isAdminLoggedIn()) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <section className="tf-login tf-section login">
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-12">
              <h2 className="tf-title-heading ct style-1">Login To NFTs</h2>
              <div className="flat-form box-login-social">
                <div className="box-title-login">
                  <h5>Login with social</h5>
                </div>
                <ul>
                  <li>
                    <a className="sc-button style-2 fl-button pri-3">
                      <i className="icon-fl-google-2" />
                      <span>Google</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flat-form box-login-social">
                <div className="box-title-login">
                  <h5>Login with Wallet</h5>
                </div>
                <ul>
                  <li>
                    <a
                      onClick={() => open()}
                      className="sc-button style-2 wallet fl-button pri-3"
                    >
                      <i className="icon-fl-wallet" />
                      <span>Connect Wallet</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

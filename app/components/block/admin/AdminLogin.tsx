"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "./FormikSchema";
import { getStyles, toaster } from "@/utils/helper";
import { postAdminRequest } from "@/utils/httpHelper";
import { useRouter } from "next/navigation";
import { setLocalstorageData } from "@/utils/localstorageHelper";
import { ADMIN_JWT_TOKEN } from "@/utils/constant";
import { useEffect } from "react";
import { isAdminLoggedIn, isLoggedIn } from "@/utils/jwtHelper";

interface Values {
  email: string;
  password: string;
}

export default function AdminLogin(): JSX.Element {
  const router = useRouter();
  const submitHandler = async (values: Values, { setSubmitting }: any) => {
    const response = await postAdminRequest("auth/login", values);
    if (response.statusCode === 200) {
      const { data } = response;
      toaster("success", "Successfully loggedin");
      setLocalstorageData({
        key: ADMIN_JWT_TOKEN,
        value: data.accessToken,
      });
      router.push("/admin/profile");
      return;
    }
    const { message } = response;
    if (message) {
      toaster("error", message);
      return;
    }
  };
  useEffect(() => {
    if (isLoggedIn() || isAdminLoggedIn()) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <section className="tf-login tf-section">
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-12">
              <h2 className="tf-title-heading ct style-1">Admin Login</h2>
              <div className="flat-form box-login-social d-none">
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
                  <li>
                    <a className="sc-button style-2 fl-button pri-3">
                      <i className="icon-fl-facebook" />
                      <span>Facebook</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flat-form box-login-email">
                <div className="box-title-login d-none">
                  <h5>Or login with email</h5>
                </div>
                <div className="form-inner">
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={submitHandler}
                    validationSchema={LoginSchema}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form>
                        <Field
                          style={getStyles(errors, "email")}
                          component="input"
                          id="email"
                          name="email"
                          tabIndex={1}
                          aria-required="true"
                          required
                          type="email"
                          placeholder="Enter your Email address"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-message"
                        />
                        <Field
                          component="input"
                          style={getStyles(errors, "password")}
                          id="password"
                          name="password"
                          tabIndex={2}
                          aria-required="true"
                          type="password"
                          placeholder="Enter your Password"
                          required
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error-message"
                        />
                        <div className="row-form style-1">
                          <label>
                            Remember me
                            <input type="checkbox" />
                            <span className="btn-checkbox" />
                          </label>
                          {/* <a className="forgot-pass">Forgot Password ?</a> */}
                        </div>
                        <button className="submit">Login</button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

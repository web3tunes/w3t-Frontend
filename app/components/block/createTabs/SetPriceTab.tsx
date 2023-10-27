"use client";
import { getBNBToAUD, getStyles, isObjectEmpty } from "@/utils/helper";
import { postRequest } from "@/utils/httpHelper";
import {
  getLocalstorageData,
  setLocalstorageData,
} from "@/utils/localstorageHelper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PriceTabSchema } from "./TabsSchema";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";
import { CURRENCY_SYMBOL, TOKEN_SYMBOL } from "@/utils/constant";
import * as Yup from "yup";
const priceSchema = Yup.object().shape({});
interface Values {
  price: number;
  quantity: number;
}
function SetPriceTab({
  setActiveTab,
  nft,
  setNft,
}: {
  nft: any;
  setActiveTab: Dispatch<SetStateAction<number>>;
  setNft: Dispatch<SetStateAction<number>>;
}) {
  const [copies, setCopies] = useState(false);
  const dispatch = useDispatch();
  const [priceInAUD, setPriceInAUD] = useState(0);

  const submitHandler = async (values: Values, { setSubmitting }: any) => {
    // console.log(values);
    // return;
    let nftId = nft.id;
    dispatch(setLoading(true));
    if (isObjectEmpty(nft)) {
      nftId = getLocalstorageData("nftId");
    }
    console.log(nftId);
    const response = await postRequest("user/setNftPrice", {
      price: values.price.toString(),
      quantity: values.quantity,
      nftId: nftId,
    });
    if (response.statusCode === 200) {
      const { web3Tune } = response.data;
      setLocalstorageData({ key: "nftId", value: web3Tune.id });
      setNft(web3Tune);
      setActiveTab(3);
    }
    dispatch(setLoading(false));
  };
  const getRates = async () => {
    const rates = await getBNBToAUD();
    setPriceInAUD(rates.AUD);
    console.log(rates);
  };
  useEffect(() => {
    getRates();
  }, []);
  return (
    <Formik
      initialValues={{
        price: 0.01,
        quantity: 1,
      }}
      onSubmit={submitHandler}
      validationSchema={PriceTabSchema}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form>
          <div className="row">
            <div className="col-md-8 offset-md-4">
              <fieldset>
                <h4 className="title-create-item">
                  Enter Price ({TOKEN_SYMBOL})
                </h4>
                <Field
                  style={getStyles(errors, "price")}
                  component="input"
                  type="text"
                  name="price"
                  min="0.01"
                  placeholder="e.g. `0.01 ETH`"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <fieldset>
                <input
                  type="checkbox"
                  name="multipleCopies"
                  onChange={() => setCopies(!copies)}
                />
                <label>Multiple Copies</label>
              </fieldset>
              {copies && (
                <fieldset>
                  <h4 className="title-create-item">Set Minting Quantity</h4>
                  <Field
                    style={getStyles(errors, "quantity")}
                    component="input"
                    type="number"
                    name="quantity"
                    placeholder="e.g. `5`"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="error-message"
                  />
                </fieldset>
              )}
              <p className="formate">
                <span>
                  {" "}
                  Service fee:{" "}
                  <strong>
                    0.25% ({values?.price} {TOKEN_SYMBOL}{" "}
                    {values?.price * priceInAUD} {CURRENCY_SYMBOL})
                  </strong>{" "}
                </span>{" "}
                <br />
                <span>
                  {" "}
                  You will receive as royalty:{" "}
                  <strong>
                    ({(values?.price * values?.quantity * 10) / 100}{" "}
                    {TOKEN_SYMBOL}{" "}
                    {(values?.price * values?.quantity * priceInAUD * 10) / 100}{" "}
                    {CURRENCY_SYMBOL})
                  </strong>
                </span>
              </p>
              <div className="d-flex justify-content-between mt-5">
                <button
                  className="sc-button loadmore style bag fl-button pri-3"
                  type="submit"
                  onClick={() => setActiveTab(1)}
                >
                  Back
                </button>
                <button
                  className="sc-button loadmore style bag fl-button pri-3"
                  type="submit"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default SetPriceTab;

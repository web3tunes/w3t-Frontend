import { getStyles, isObjectEmpty } from "@/utils/helper";
import { postRequest } from "@/utils/httpHelper";
import {
  getLocalstorageData,
  setLocalstorageData,
} from "@/utils/localstorageHelper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { BillingInfoTabSchema } from "./TabsSchema";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";
interface Values {
  price: number;
  quantity: number;
}
function BillingInfoTab({
  setActiveTab,
  nft,
  setNft,
}: {
  nft: any;
  setActiveTab: Dispatch<SetStateAction<number>>;
  setNft: Dispatch<SetStateAction<number>>;
}) {
  const dispatch = useDispatch();
  const submitHandler = async (values: Values, { setSubmitting }: any) => {
    dispatch(setLoading(true));
    let nftId = nft.id;
    if (isObjectEmpty(nft)) {
      nftId = getLocalstorageData("nftId");
    }
    console.log(nftId);
    const response = await postRequest("user/nftBillingInfo", {
      ...values,
      nftId: nftId,
    });
    if (response.statusCode === 200) {
      const { web3Tune } = response.data;
      setLocalstorageData({ key: "nftId", value: web3Tune.id });
      setNft(web3Tune);
      setActiveTab(4);
    }
    dispatch(setLoading(false));
  };
  return (
    <Formik
      initialValues={{
        price: 0.01,
        quantity: 0,
      }}
      onSubmit={submitHandler}
      validationSchema={BillingInfoTabSchema}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="row">
            <div className="col-md-8 offset-md-4">
              <fieldset>
                <h4 className="title-create-item">Your IBAN #</h4>
                <Field
                  style={getStyles(errors, "iban")}
                  component="input"
                  type="text"
                  name="iban"
                  placeholder="e.g. `AT611904300234573201`"
                />
                <ErrorMessage
                  name="iban"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <div className="d-flex justify-content-between mt-5">
                <button
                  className="sc-button loadmore style bag fl-button pri-3"
                  type="submit"
                  onClick={() => setActiveTab(2)}
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
export default BillingInfoTab;

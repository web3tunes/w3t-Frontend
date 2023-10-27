import { Dispatch, SetStateAction } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getStyles, isObjectEmpty } from "@/utils/helper";
import {
  getLocalstorageData,
  removeLocalstorageData,
  setLocalstorageData,
} from "@/utils/localstorageHelper";
import { postRequest } from "@/utils/httpHelper";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";

interface Values {
  price: number;
  quantity: number;
}
function SendForMinitingTab({
  setActiveTab,
  nft,
  setNft,
}: {
  nft: any;
  setActiveTab: Dispatch<SetStateAction<number>>;
  setNft: Dispatch<SetStateAction<number>>;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const submitHandler = async (values: Values, { setSubmitting }: any) => {
    dispatch(setLoading(true));

    let nftId = nft.id;
    if (isObjectEmpty(nft)) {
      nftId = getLocalstorageData("nftId");
    }
    console.log(nftId);
    const response = await postRequest("user/nftSendForMint", {
      ...values,
      nftId: nftId,
    });
    if (response.statusCode === 200) {
      const { web3Tune } = response.data;
      removeLocalstorageData("nftId");
      setNft(web3Tune);
      router.push("/profile");
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
    }
  };
  return (
    <Formik
      initialValues={{
        price: 0.01,
        quantity: 0,
      }}
      onSubmit={submitHandler}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="row">
            <div className="col-md-8 offset-md-4">
              <fieldset>
                <h4 className="title-create-item">
                  Notes for System Administrator
                </h4>
                <Field
                  style={getStyles(errors, "note")}
                  component="textarea"
                  name="note"
                  placeholder="e.g. “This project is...”"
                />
                <ErrorMessage
                  name="note"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <div className="d-flex justify-content-between mt-5">
                <button
                  className="sc-button loadmore style bag fl-button pri-3"
                  type="submit"
                  onClick={() => setActiveTab(3)}
                >
                  Back
                </button>
                <button
                  className="sc-button loadmore style bag fl-button pri-3"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default SendForMinitingTab;

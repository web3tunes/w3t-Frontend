"use client";
import { useParams, useRouter } from "next/navigation";
import AdminEditForm from "./AdminEditForm";
import { getAdminRequest } from "@/utils/httpHelper";
import { useEffect, useState } from "react";
import { toaster } from "@/utils/helper";

export default function AdminEditPage() {
  const { id } = useParams();
  const [nftDetails, setNFTDetails] = useState({});
  const router = useRouter();
  const fetchData = async () => {
    const response = await getAdminRequest(`getNft/${id}`);
    if (response.statusCode === 200) {
      const { nftDetails } = response.data;
      console.log(nftDetails);
      setNFTDetails(nftDetails);
      return;
    }
    console.log(response);
    if (response.statusCode === 401) {
      toaster("error", "Please login your token is expired");
      router.push("/admin/login");
      return;
    }
    const { message } = response;
    if (message) {
      toaster("error", message);
      return;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="tf-create-item tf-section">
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="form-create-item tab-content">
                <div className="flat-tabs tab-create-item">
                  <div className="content-inner sc-card-product">
                    <AdminEditForm nftDetails={nftDetails} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

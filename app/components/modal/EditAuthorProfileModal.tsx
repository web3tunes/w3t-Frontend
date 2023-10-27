"use client";

import { setLoading } from "@/store/slice/loadingSlice";
import { getStyles, toaster } from "@/utils/helper";
import { putRequest, uploadFilesFormData } from "@/utils/httpHelper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function EditAuthProfileModal({
  profile,
  fetchUserProfileData,
}: {
  profile: any;
  fetchUserProfileData: any;
}): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [getImage, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async (event: any) => {
    event.preventDefault();
    dispatch(setLoading(true));
    buttonRef?.current?.click();

    // if (!name) {
    //   return;
    // }
    console.log("here");
    let imageUrl: any;
    if (getImage !== null) {
      const formData = new FormData();
      formData.append("file", getImage);
      imageUrl = await uploadFilesFormData("user/file", formData);
    }
    const formOb = {
      name,
      profileImage: imageUrl?.url ? imageUrl?.url : profileImage,
    };
    const response = await putRequest("user/profile", formOb);
    if (response.statusCode === 200) {
      buttonRef?.current?.click();
      setImage(null);
      toaster("success", "Profile successfully updated");
      await fetchUserProfileData();
    }
    dispatch(setLoading(false));
  };
  useEffect(() => {
    setName(profile.name);
    setProfileImage(profile.profileImage);
  }, [profile]);
  return (
    <>
      <div
        className="modal fade popup"
        id="editAuthorProfilePopup"
        tabIndex={-1}
        aria-labelledby="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button
              ref={buttonRef}
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-20 pd-40">
              <h3>Edit Profile</h3>
              <form onSubmit={submitHandler}>
                <p>Enter your name</p>
                <input
                  type="text"
                  className="form-control quantity mb-4"
                  placeholder="Name"
                  required
                  value={name || ""}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                {/* <p>Upload your profile image</p>
                <input
                  type="file"
                  className="form-control quantity"
                  placeholder="Name"
                  accept="image/*"
                  required
                  onChange={(e) => {
                    setImage(e.target.files?.[0] || null);
                  }}
                />
                <Image
                  src={
                    getImage !== null
                      ? URL.createObjectURL(getImage)
                      : profileImage
                      ? profileImage
                      : "/assets/images/userDefault.png"
                  }
                  alt=""
                  width={"500"}
                  height={"300"}
                /> */}
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

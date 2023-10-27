"use client";
import { ErrorMessage, Field, Form, Formik, isObject } from "formik";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getStyles } from "@/utils/helper";
import { setLocalstorageData } from "@/utils/localstorageHelper";
import { postRequest, uploadFilesFormData } from "@/utils/httpHelper";
import ReactAudioPlayer from "react-audio-player";
import Image from "next/image";
import { EditNftInfo } from "../FormikSchema";

interface Values {
  name: string | "";
  description: string | "";
  trackNo: number | "";
  genre: string | "";
  bpm: number | 0;
  externalUrl: string | "";
  duration: number | 0;
  releaseDate: Date | "";
  recordLabel: string | "";
  trackPublisher: string | "";
  location: string | "";
  lyrics: string | "";
  artistName: string | "";
  artistEmail: string | "";
  projectTitle: string | "";
  projectType: string | "";
  projectReleaseDate: Date | "";
  projectRecordLabel: string | "";
  projectPublisher: string | "";
  projectDescription: string | "";
  license: string | "";
  isrc: string | "";
  upc: string | "";
  musicFile: any;
  coverImage: any;
  artWorkImage: any;
  trackVisualizer: any;
  projectArtWork: any;
}

// {
//   setActiveTab,
//   nft,
//   setNft,
// }: {
//   nft: Object;
//   setActiveTab: Dispatch<SetStateAction<number>>;
//   setNft: Dispatch<SetStateAction<number>>;
// }
function AdminEditForm({ nftDetails }: { nftDetails: any }) {
  const [getMusicFile, setMusicFile] = useState<null | any>(null);
  const [getTrackVisualizer, setTrackVisualizer] = useState<null | any>(null);
  const [getCoverImg, setCoverImg] = useState<null | any>(null);
  const [getArtWorkImg, setArtWorkImg] = useState<null | any>(null);
  const [getProjectArtImg, setProjectArtImg] = useState<null | any>(null);
  const [copies, setCopies] = useState(false);

  const uploadImage = (e: any, setter: any) => {
    setter(e.target.files[0]);
  };
  const uploadFileHandler = async (fileInput: any) => {
    console.log(fileInput);
    const formData = new FormData();
    formData.append("file", fileInput);
    const response: any = await uploadFilesFormData("user/file", formData);
    return response?.url;
  };
  const submitHandler = async (values: Values, { setSubmitting }: any) => {
    const formData = values;
    formData["musicFile"] = await uploadFileHandler(values?.musicFile);
    formData["coverImage"] = await uploadFileHandler(values?.coverImage);
    formData["artWorkImage"] = await uploadFileHandler(values?.artWorkImage);
    formData["trackVisualizer"] = await uploadFileHandler(
      values?.trackVisualizer
    );
    formData["projectArtWork"] = await uploadFileHandler(
      values?.projectArtWork
    );
    const response = await postRequest("user/createNft", formData);
    if (response.statusCode === 200) {
      const { web3Tune } = response.data;
      setLocalstorageData({ key: "nftId", value: web3Tune.id });
      // setNft(web3Tune);
      // setActiveTab(2);
    }
  };
  useEffect(() => {}, [nftDetails]);
  console.log(isObject(nftDetails) ? nftDetails.name : "");
  return (
    <Formik
      initialValues={{
        name: isObject(nftDetails) ? nftDetails.name : "",
        description: isObject(nftDetails) ? nftDetails.description : "",
        trackNo: isObject(nftDetails) ? nftDetails.trackNo : "",
        genre: isObject(nftDetails) ? nftDetails.genre : "",
        bpm: isObject(nftDetails) ? nftDetails.bpm : 1,
        externalUrl: isObject(nftDetails) ? nftDetails.externalUrl : "",
        duration: isObject(nftDetails) ? nftDetails.duration : 1,
        releaseDate: isObject(nftDetails) ? nftDetails.releaseDate : "",
        recordLabel: isObject(nftDetails) ? nftDetails.recordLabel : "",
        trackPublisher: isObject(nftDetails) ? nftDetails.trackPublisher : "",
        location: isObject(nftDetails) ? nftDetails.location : "",
        lyrics: isObject(nftDetails) ? nftDetails.lyrics : "",
        artistName: isObject(nftDetails) ? nftDetails.artistName : "",
        artistEmail: isObject(nftDetails) ? nftDetails.artistEmail : "",
        projectTitle: isObject(nftDetails) ? nftDetails.projectTitle : "",
        projectType: isObject(nftDetails) ? nftDetails.projectType : "",
        projectReleaseDate: isObject(nftDetails)
          ? nftDetails.projectReleaseDate
          : "",
        projectRecordLabel: isObject(nftDetails)
          ? nftDetails.projectRecordLabel
          : "",
        projectPublisher: isObject(nftDetails)
          ? nftDetails.projectPublisher
          : "",
        projectDescription: isObject(nftDetails)
          ? nftDetails.projectDescription
          : "",
        license: isObject(nftDetails) ? nftDetails.license : "",
        isrc: isObject(nftDetails) ? nftDetails.isrc : "",
        upc: isObject(nftDetails) ? nftDetails.upc : "",
        musicFile: isObject(nftDetails) ? nftDetails.musicFile : "",
        coverImage: isObject(nftDetails) ? nftDetails.coverImage : "",
        artWorkImage: isObject(nftDetails) ? nftDetails.artWorkImage : "",
        trackVisualizer: isObject(nftDetails) ? nftDetails.trackVisualizer : "",
        projectArtWork: isObject(nftDetails) ? nftDetails.projectArtWork : "",
      }}
      onSubmit={submitHandler}
      initialTouched={{
        name: true,
        description: true,
      }}
      validationSchema={EditNftInfo}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 col-12 text-center">
              <ReactAudioPlayer
                src={
                  getMusicFile !== null
                    ? URL.createObjectURL(getMusicFile)
                    : isObject(nftDetails)
                    ? nftDetails.musicFile
                    : ""
                }
                // autoplay
                controls
              />
              <fieldset className="uploadFile2">
                <h4 className="title-create-item">Upload Music file</h4>
                <span>WAV, MP3, WAVE, MPEG, VND.AUDIOGRAPH</span>
                <input
                  style={getStyles(errors, "musicFile")}
                  type="file"
                  name="musicFile"
                  accept=".wav, .mp3, .wave, .mpeg, audio/vnd.audiograph"
                  onChange={(event: any) => {
                    setFieldValue("musicFile", event.currentTarget.files[0]);
                    uploadImage(event, setMusicFile);
                  }}
                />
                <ErrorMessage
                  name="musicFile"
                  component="div"
                  className="error-message"
                />
              </fieldset>

              <div className="card-media">
                {isObject(nftDetails) || getCoverImg !== null ? (
                  <Image
                    id="coverImg"
                    src={
                      getCoverImg !== null
                        ? URL.createObjectURL(getCoverImg)
                        : isObject(nftDetails)
                        ? nftDetails.coverImage
                        : ""
                    }
                    alt="Image"
                    height={500}
                    width={500}
                  />
                ) : (
                  ""
                )}
              </div>
              <fieldset className="uploadFile2">
                <h4 className="title-create-item">Upload Cover Image</h4>
                <span>JPEG, PNG, WEBP</span>
                <input
                  style={getStyles(errors, "coverImage")}
                  type="file"
                  name="coverImage"
                  placeholder="Item Name"
                  accept="image/*"
                  onChange={(event: any) => {
                    setFieldValue("coverImage", event.currentTarget.files[0]);
                    uploadImage(event, setCoverImg);
                  }}
                />
                <ErrorMessage
                  name="coverImage"
                  component="div"
                  className="error-message"
                />
              </fieldset>

              <div className="card-media">
                <Image
                  id="artWorkImg"
                  src={
                    getArtWorkImg !== null
                      ? URL.createObjectURL(getArtWorkImg)
                      : isObject(nftDetails)
                      ? nftDetails.artWorkImage
                      : ""
                  }
                  alt="Image"
                  height={500}
                  width={500}
                />
              </div>

              <fieldset className="uploadFile2">
                <h4 className="title-create-item">
                  Upload Track Artwork Image
                </h4>
                <span>JPEG, PNG, WEBP</span>
                <input
                  style={getStyles(errors, "artWorkImage")}
                  type="file"
                  name="artWorkImage"
                  placeholder="Item Name"
                  onChange={(event: any) => {
                    setFieldValue("artWorkImage", event.currentTarget.files[0]);
                    uploadImage(event, setArtWorkImg);
                  }}
                />
                <ErrorMessage
                  name="artWorkImage"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <ReactAudioPlayer
                src={
                  getTrackVisualizer !== null
                    ? URL.createObjectURL(getTrackVisualizer)
                    : isObject(nftDetails)
                    ? nftDetails.trackVisualizer
                    : ""
                }
                // autoplay
                controls
              />
              <fieldset className="uploadFile2">
                <h4 className="title-create-item">Upload Track Visualizer</h4>
                <span>WAV, MP3, WAVE, MPEG, VND.AUDIOGRAPH</span>
                <input
                  style={getStyles(errors, "trackVisualizer")}
                  type="file"
                  name="trackVisualizer"
                  placeholder="Item Name"
                  accept=".wav, .mp3, .wave, .mpeg, audio/vnd.audiograph"
                  onChange={(event: any) => {
                    setFieldValue(
                      "trackVisualizer",
                      event.currentTarget.files[0]
                    );
                    uploadImage(event, setTrackVisualizer);
                  }}
                />
                <ErrorMessage
                  name="trackVisualizer"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <div className="card-media">
                <Image
                  id="projectArtWorkImg"
                  src={
                    getProjectArtImg !== null
                      ? URL.createObjectURL(getProjectArtImg)
                      : isObject(nftDetails)
                      ? nftDetails.projectArtWork
                      : ""
                  }
                  alt="Image"
                  height={500}
                  width={500}
                />
              </div>
              <fieldset className="uploadFile2">
                <h4 className="title-create-item">Upload Project Art Work</h4>
                <span>JPEG, PNG, WEBP</span>
                <input
                  style={getStyles(errors, "projectArtWork")}
                  type="file"
                  name="projectArtWork"
                  placeholder="Item Name"
                  onChange={(event: any) => {
                    setFieldValue(
                      "projectArtWork",
                      event.currentTarget.files[0]
                    );
                    uploadImage(event, setProjectArtImg);
                  }}
                />
                <ErrorMessage
                  name="projectArtWork"
                  component="div"
                  className="error-message"
                />
              </fieldset>
            </div>
            <div className="col-xl-8 col-lg-6 col-md-12 col-12">
              <fieldset>
                <h4 className="title-create-item">Title</h4>
                <Field
                  style={getStyles(errors, "name")}
                  component="input"
                  type="text"
                  name="name"
                  placeholder="Item Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <fieldset>
                <h4 className="title-create-item">Description</h4>
                <Field
                  style={getStyles(errors, "description")}
                  component="textarea"
                  placeholder="e.g. “This is very limited item”"
                  name="description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <div className="row-form style-3 mb-3">
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Track #</h4>
                    <Field
                      style={getStyles(errors, "trackNo")}
                      component="input"
                      type="number"
                      name="trackNo"
                      placeholder="e.g. 012"
                    />
                    <ErrorMessage
                      name="trackNo"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Genre</h4>
                    <Field
                      style={getStyles(errors, "genre")}
                      component="input"
                      type="text"
                      name="genre"
                      placeholder="e.g. Rock"
                    />
                    <ErrorMessage
                      name="genre"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">
                      BPM (Beats per minute)
                    </h4>
                    <Field
                      style={getStyles(errors, "bpm")}
                      component="input"
                      type="number"
                      name="bpm"
                      placeholder="e.g. 17"
                    />
                    <ErrorMessage
                      name="bpm"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
              </div>
              <div className="row-form style-3 mb-3">
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">External URL</h4>
                    <Field
                      style={getStyles(errors, "externalUrl")}
                      component="input"
                      type="text"
                      name="externalUrl"
                    />
                    <ErrorMessage
                      name="externalUrl"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Duration</h4>
                    <Field
                      style={getStyles(errors, "duration")}
                      component="input"
                      type="number"
                      name="duration"
                      placeholder="e.g. 15 sec"
                    />
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Release date</h4>
                    <Field
                      style={getStyles(errors, "releaseDate")}
                      component="input"
                      type="date"
                      name="releaseDate"
                    />
                    <ErrorMessage
                      name="releaseDate"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
              </div>

              <div className="row-form style-2 mb-3">
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Record label (track)</h4>
                    <Field
                      style={getStyles(errors, "recordLabel")}
                      component="input"
                      type="text"
                      name="recordLabel"
                    />
                    <ErrorMessage
                      name="recordLabel"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Publisher (track)</h4>
                    <Field
                      style={getStyles(errors, "trackPublisher")}
                      component="input"
                      type="text"
                      name="trackPublisher"
                    />
                    <ErrorMessage
                      name="trackPublisher"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
              </div>
              <fieldset>
                <h4 className="title-create-item">Location</h4>
                <Field
                  style={getStyles(errors, "location")}
                  component="input"
                  type="text"
                  name="location"
                  placeholder="e.g. `New York City`"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <fieldset>
                <h4 className="title-create-item">Lyrics</h4>
                <Field
                  style={getStyles(errors, "lyrics")}
                  component="textarea"
                  name="lyrics"
                />
                <ErrorMessage
                  name="lyrics"
                  component="div"
                  className="error-message"
                />
              </fieldset>

              <h3 className="section-title-create-item">Price Info</h3>
              <fieldset>
                <h4 className="title-create-item">Enter Price (ETH)</h4>
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

              <h3 className="section-title-create-item">Billing Info</h3>
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

              <h3 className="section-title-create-item">Who is the Artist?</h3>

              <div className="row-form style-2 mb-3">
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Artist Name</h4>
                    <Field
                      style={getStyles(errors, "artistName")}
                      component="input"
                      type="text"
                      name="artistName"
                      placeholder="e.g. `John Doe`"
                    />
                    <ErrorMessage
                      name="artistName"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Artist Email</h4>
                    <Field
                      style={getStyles(errors, "artistEmail")}
                      component="input"
                      type="email"
                      name="artistEmail"
                      placeholder="e.g. `musician@xstudio.com`"
                    />
                    <ErrorMessage
                      name="artistEmail"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
              </div>

              <h3 className="section-title-create-item">
                Is this part of any project?
              </h3>
              <fieldset
                className={`${errors.name && touched.name ? "error" : ""}`}
              >
                <h4 className="title-create-item">Project Title</h4>
                <Field
                  style={getStyles(errors, "projectTitle")}
                  component="input"
                  type="text"
                  name="projectTitle"
                />
                <ErrorMessage
                  name="projectTitle"
                  component="div"
                  className="error-message"
                />
              </fieldset>
              <div className="row-form style-2 mb-3">
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Project Type</h4>
                    <Field
                      style={getStyles(errors, "projectType")}
                      as="select"
                      id="projectType"
                      name="projectType"
                    >
                      <option value="">Select option</option>
                      <option value="Single">Single</option>
                      <option value="EP">EP</option>
                      <option value="Album">Album</option>
                    </Field>
                    <ErrorMessage
                      name="projectType"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Project Release Date</h4>
                    <Field
                      style={getStyles(errors, "projectReleaseDate")}
                      component="input"
                      type="date"
                      name="projectReleaseDate"
                    />
                    <ErrorMessage
                      name="projectReleaseDate"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
              </div>
              <div className="row-form style-2 mb-3">
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Project Record Label</h4>
                    <Field
                      style={getStyles(errors, "projectRecordLabel")}
                      component="input"
                      type="text"
                      name="projectRecordLabel"
                    />
                    <ErrorMessage
                      name="projectRecordLabel"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">Project Publisher</h4>
                    <Field
                      style={getStyles(errors, "projectPublisher")}
                      component="input"
                      type="text"
                      name="projectPublisher"
                      placeholder="e.g. `xStudios`"
                    />
                    <ErrorMessage
                      name="projectPublisher"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
              </div>
              <fieldset>
                <h4 className="title-create-item">Project Description</h4>
                <Field
                  style={getStyles(errors, "projectDescription")}
                  component="textarea"
                  name="projectDescription"
                  placeholder={"e.g. “This project is...”"}
                />
                <ErrorMessage
                  name="projectDescription"
                  component="div"
                  className="error-message"
                />
              </fieldset>

              <h3 className="section-title-create-item">License Details</h3>
              <div className="row-form style-3 mb-3">
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">License</h4>
                    <Field
                      style={getStyles(errors, "license")}
                      component="input"
                      type="text"
                      name="license"
                    />
                    <ErrorMessage
                      name="license"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">ISRC</h4>
                    <Field
                      style={getStyles(errors, "isrc")}
                      component="input"
                      type="text"
                      name="isrc"
                    />
                    <ErrorMessage
                      name="isrc"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
                <div className="inner-row-form">
                  <fieldset>
                    <h4 className="title-create-item">UPC</h4>
                    <Field
                      style={getStyles(errors, "upc")}
                      component="input"
                      type="text"
                      name="upc"
                    />
                    <ErrorMessage
                      name="upc"
                      component="div"
                      className="error-message"
                    />
                  </fieldset>
                </div>
              </div>

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
            </div>
          </div>
          <div className="text-end mt-5">
            <button
              className="sc-button loadmore style bag fl-button pri-3"
              type="submit"
            >
              Update
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default AdminEditForm;

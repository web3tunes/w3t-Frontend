"use client";
// @ts-ignore

import { ErrorMessage, Field, Form, Formik, isObject } from "formik";
import { useEffect, useState } from "react";
import {
  createIpfsUrlFromFileUrl,
  generateFileName,
  getMimeType,
  getStyles,
  isFile,
  isURL,
  toaster,
  urlToObject,
} from "@/utils/helper";
import {
  adminUploadFilesFormData,
  getAdminRequest,
  postAdminRequest,
  putAdminRequest,
} from "@/utils/httpHelper";
import ReactAudioPlayer from "react-audio-player";
import Image from "next/image";
import { NFTStorage } from "nft.storage";
import { EditNftInfo, isValidAudioFile, isValidSize } from "../FormikSchema";
import {
  etherTunesMainContract,
  etherTunesMarketContract,
  web3TunesContract,
  web3TunesMarketplaceContract,
} from "@/contracts/contractHelper";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";
import { isAdminLoggedIn } from "@/utils/jwtHelper";
import { magic } from "@/libs/magic";
import { useWeb3 } from "@/context/Web3Context";
import { useUser } from "@/context/UserContext";
import WEB3TUNES_NFT_ADDRESS from "@/contracts/WEB3TUNES_NFT_ADDRESS.json";
import WEB3TUNES_MARKETPLACE from "@/contracts/WEB3TUNES_MARKETPLACE.json";
import Web3 from "web3";

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

function AdminEditForm({ nftDetails }: { nftDetails: any }) {
  const dispatch = useDispatch();
  const router = useRouter();
  // const provider = usePublicClient();
  // const { data: walletClient } = useWalletClient();
  const [getMusicFile, setMusicFile] = useState<null | any>(null);
  const [getTrackVisualizer, setTrackVisualizer] = useState<null | any>(null);
  const [getCoverImg, setCoverImg] = useState<null | any>(null);
  const [getArtWorkImg, setArtWorkImg] = useState<null | any>(null);
  const [getProjectArtImg, setProjectArtImg] = useState<null | any>(null);
  const [copies, setCopies] = useState(false);
  const [nftData, setNFTData] = useState(nftDetails);
  const { address } = useUser();
  // const { address } = useAccount();
  const { initializeWeb3, web3 } = useWeb3();
  const uploadImage = (e: any, setter: any) => {
    setter(e.target.files[0]);
  };
  const onchangeHandler = async (value: any) => {};
  const uploadFileHandler = async (fileInput: any) => {
    console.log(fileInput);
    const formData = new FormData();
    formData.append("file", fileInput);
    const response: any = await adminUploadFilesFormData("file", formData);
    return response?.url;
  };
  const handleConnect = async () => {
    try {
      if (typeof window != "undefined") {
        if (!magic) return;
        // Try to connect to the wallet using Magic's user interface
        await magic.wallet.connectWithUI();

        // If connection to the wallet was successful, initialize new Web3 instance
        initializeWeb3();
      }
    } catch (error) {
      // Log any errors that occur during the connection process
      console.error("handleConnect:", error);
    }
  };
  const test = () => {
    open();
  };
  const submitHandler = async (values: Values, { setSubmitting }: any) => {
    dispatch(setLoading(true));
    const formData = values;
    const {
      musicFile,
      coverImage,
      artWorkImage,
      trackVisualizer,
      projectArtWork,
    } = formData;
    if (isFile(musicFile)) {
      formData["musicFile"] = await uploadFileHandler(musicFile);
    }
    if (isFile(coverImage)) {
      formData["coverImage"] = await uploadFileHandler(coverImage);
    }
    if (isFile(artWorkImage)) {
      formData["artWorkImage"] = await uploadFileHandler(artWorkImage);
    }
    if (isFile(trackVisualizer)) {
      formData["trackVisualizer"] = await uploadFileHandler(trackVisualizer);
    }
    if (isFile(projectArtWork)) {
      formData["projectArtWork"] = await uploadFileHandler(projectArtWork);
    }
    // console.log(formData);
    const response = await putAdminRequest(
      `updateNft/${nftDetails.id}`,
      formData
    );
    // console.log(response);
    if (response.statusCode === 200) {
      const { web3Tune } = response.data;
      setNFTData(web3Tune);
      toaster("success", "Successfully updated");
    }
    dispatch(setLoading(false));
  };

  const mintNft = async () => {
    try {
      dispatch(setLoading(true));
      if (!address) {
        dispatch(setLoading(false));
        handleConnect();
        return;
      }
      // console.log(block?.gasLimit);
      // return;
      const data = nftDetails;
      const {
        name,
        description,
        trackNo,
        genre,
        bpm,
        externalUrl,
        duration,
        releaseDate,
        recordLabel,
        trackPublisher,
        location,
        lyrics,
        artistName,
        artistEmail,
        projectTitle,
        projectType,
        projectReleaseDate,
        projectRecordLabel,
        projectPublisher,
        projectDescription,
        license,
        isrc,
        upc,
        musicFile,
        coverImage,
        artWorkImage,
        trackVisualizer,
        projectArtWork,
        price,
        quantity,
      } = data;
      const metadata: any = {
        version: "0.1",
        project: {
          title: projectTitle,
          originalReleaseDate: releaseDate,
          recordLabel,
          publisher: projectPublisher,
          description: projectDescription,
          upc,
        },
        key: generateFileName(),
        attributes: {
          key: generateFileName(),
          genre,
          bpm,
          artist: artistName,
          project: projectTitle,
          recordLabel,
          license,
        },
        name,
        description,
        title: projectTitle,
        trackNo,
        genre,
        bpm,
        externalUrl,
        duration,
        releaseDate,
        recordLabel,
        publisher: trackPublisher,
        location,
        lyrics,
        artist: artistName,
        license,
        isrc,
        image: await urlToObject(coverImage),
        animationUrl: {
          uri: await urlToObject(musicFile),
          mimeType: await getMimeType(musicFile),
        },
      };
      if (artWorkImage && artWorkImage !== null) {
        metadata["artWork"] = {
          uri: await urlToObject(artWorkImage),
          mimeType: await getMimeType(artWorkImage),
        };
      }
      if (trackVisualizer && trackVisualizer !== null) {
        metadata["visualizer"] = {
          uri: await urlToObject(trackVisualizer),
          mimeType: await getMimeType(trackVisualizer),
        };
      }
      if (projectArtWork && projectArtWork !== null) {
        metadata.project["artWork"] = {
          uri: await urlToObject(projectArtWork),
          mimeType: await getMimeType(projectArtWork),
        };
      }
      // console.log(metadata);
      // return;
      if ((await getMimeType(musicFile)) === "audio/wav") {
        metadata["losslessAudio"] = await urlToObject(musicFile);
      }
      // console.log(web3);
      if (typeof window === "undefined") return;
      const block = await web3?.eth.getBlock("latest");

      // console.log(typeof window !== "undefined" && window?.ethereum);
      const web3TuneNftContract = await web3TunesContract(web3);
      if (!web3) return;
      // const web3TuneNftContract: any = new web3.eth.Contract(
      //   WEB3TUNES_NFT_ADDRESS,
      //   process.env.NEXT_PUBLIC_WEB3TUNES_NFT_ADDRESS
      // );
      const mainContract = await etherTunesMainContract();
      const marketContract = await etherTunesMarketContract();
      const check = await mainContract.isApprovedForAll(
        address,
        process.env.NEXT_PUBLIC_WEB3TUNES_MARKETPLACE_ADDRESS
      );
      if (!check) {
        dispatch(setLoading(false));
        toaster("error", "Please connect with owner wallet account");
        return;
      }
      const nftId = (await mainContract.getCurrentNftId())?.toString();
      const listingId = (
        await marketContract.getCurrentListingId()
      )?.toString();
      // const nftId = "1";
      // const listingId = "1";
      // console.log(nftId, listingId);
      // return;
      // const responseCount = await getAdminRequest("nftMintedCount");
      // // console.log(responseCount);
      // // return;
      // let nftCount = 0;
      // if (responseCount.statusCode === 200) {
      //   const { count } = responseCount.data;
      //   nftCount = parseInt(count) + 1;
      // } else {
      //   dispatch(setLoading(false));
      //   toaster("error", "Something went wrong please try again");
      //   return;
      // }

      // console.log(responseCount, nftCount);
      // dispatch(setLoading(false));
      // return;
      // console.log(address, check);
      // console.log(typeof quantity);
      // return;
      const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
      });
      const ipfs: any = await client
        .store(metadata)
        .then((response) => response)
        .catch((error) => {
          console.error(error);
          return { error: error.message };
        });
      // const ipfs = {
      //   ipnft: "bafyreibbmwo6habeoeclkooherz3wtspceso4tz7usycfwbd3t6lyndzdu",
      //   url: "ipfs://bafyreibbmwo6habeoeclkooherz3wtspceso4tz7usycfwbd3t6lyndzdu/metadata.json",
      // };
      console.log(ipfs);
      // return;
      // console.log(web3.utils.toWei(price, "ether"));
      // console.log;
      console.log(nftId, "mintTx");

      let mintTx = await mainContract.mint(String(address), nftId, quantity);
      mintTx = await mintTx.wait();
      console.log(mintTx, "mintTx");
      // return;
      let tokenUri = await mainContract.setTokenUri(nftId, ipfs.url);
      tokenUri = await tokenUri.wait();
      let listTx = await marketContract.listNft(
        nftId,
        quantity,
        web3?.utils.toWei(price, "ether")
      );
      listTx = await listTx.wait();
      const response = await postAdminRequest("nftMinted", {
        mintHash: mintTx.transactionHash,
        listHash: listTx.transactionHash,
        web3TuneId: nftDetails.id,
        userWeb3Address: address,
        nftId: parseInt(nftId),
        listingId: parseInt(listingId),
        tokenUri: ipfs.url,
      });
      console.log(response, response.statusCode === 200);
      if (response.statusCode === 200) {
        dispatch(setLoading(false));
        toaster("success", "Successfully minted");
        router.push("/admin/profile");
        return;
      }
      dispatch(setLoading(false));
      const { message } = response;
      if (message) {
        toaster("error", message);
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setLoading(false));
      if (error?.code === -32603) {
        // alert(error?.data?.message)
        toaster("error", error?.data?.message);
      } else if (error?.code === 4001) {
        // alert(error?.message)
        toaster("error", error?.message);
      } else {
        toaster("error", error?.message);
      }
    }
  };

  const testMint = async () => {
    const mainContract = await etherTunesMainContract();
    const marketContract = await etherTunesMarketContract();
    const nftId = (await mainContract.getCurrentNftId())?.toString();
    const listingId = (await marketContract.getCurrentListingId())?.toString();
    console.log(nftId, listingId);
    // const listingId = await mainContract.getCurrentListingId();
    // console.log(nftId, listingId);
    // const tx = await mainContract.mint(address, nftId, 5);
    // await tx.wait();
  };
  useEffect(() => {
    if (!address && isAdminLoggedIn()) {
      // handleConnect();
    }
    if (nftDetails?.quantity > 1) {
      setCopies(true);
    }
  }, [nftDetails]);
  return (
    <Formik
      initialValues={nftDetails}
      onSubmit={submitHandler}
      initialTouched={{
        name: true,
        description: true,
      }}
      validationSchema={EditNftInfo}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 col-12 text-center">
              <ReactAudioPlayer
                src={
                  getMusicFile !== null && !isURL(getMusicFile)
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
                    console.log(event.currentTarget.files);
                    const file = event.currentTarget.files[0];
                    if (!isValidAudioFile(file)) {
                      toaster("error", "Not a valid audio type");
                      return;
                    }
                    if (!isValidSize(file)) {
                      toaster("error", "Max allowed size is 200MB");
                      return;
                    }
                    setFieldValue("musicFile", file);
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
                {(isObject(nftDetails) && nftDetails?.coverImage) ||
                getCoverImg !== null ? (
                  <Image
                    id="coverImg"
                    src={
                      getCoverImg !== null && !isURL(getCoverImg)
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
                {nftDetails?.artWorkImage || getArtWorkImg !== null ? (
                  <Image
                    id="artWorkImg"
                    src={
                      getArtWorkImg !== null && !isURL(getArtWorkImg)
                        ? URL.createObjectURL(getArtWorkImg)
                        : isObject(nftDetails)
                        ? nftDetails.artWorkImage
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
                <h4 className="title-create-item">
                  Upload Track Artwork Image
                </h4>
                <span>JPEG, PNG, WEBP</span>
                <input
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
              {nftDetails?.trackVisualizer || getTrackVisualizer !== null ? (
                <ReactAudioPlayer
                  src={
                    getTrackVisualizer !== null && !isURL(getTrackVisualizer)
                      ? URL.createObjectURL(getTrackVisualizer)
                      : isObject(nftDetails)
                      ? nftDetails.trackVisualizer
                      : ""
                  }
                  // autoplay
                  controls
                />
              ) : (
                ""
              )}
              <fieldset className="uploadFile2">
                <h4 className="title-create-item">Upload Track Visualizer</h4>
                <span>WAV, MP3, WAVE, MPEG, VND.AUDIOGRAPH</span>
                <input
                  type="file"
                  name="trackVisualizer"
                  placeholder="Item Name"
                  accept=".wav, .mp3, .wave, .mpeg, audio/vnd.audiograph"
                  onChange={(event: any) => {
                    const file = event.currentTarget.files[0];
                    if (!isValidAudioFile(file)) {
                      toaster("error", "Not a valid audio type");
                      return;
                    }
                    if (!isValidSize(file)) {
                      toaster("error", "Max allowed size is 200MB");
                      return;
                    }
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
                {nftDetails?.projectArtWork || getProjectArtImg !== null ? (
                  <Image
                    id="projectArtWorkImg"
                    src={
                      getProjectArtImg !== null && !isURL(getProjectArtImg)
                        ? URL.createObjectURL(getProjectArtImg)
                        : isObject(nftDetails)
                        ? nftDetails.projectArtWork
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
                <h4 className="title-create-item">Upload Project Art Work</h4>
                <span>JPEG, PNG, WEBP</span>
                <input
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
                  checked={copies}
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
          <div className="mt-5 d-flex justify-content-between">
            <button
              className="sc-button loadmore style bag fl-button pri-3"
              type="button"
              onClick={() => mintNft()}
            >
              Mint
            </button>
            <button
              className="sc-button loadmore style bag fl-button pri-3"
              type="submit"
            >
              Update
            </button>
          </div>
          <div className="text-end mt-5"></div>
        </Form>
      )}
    </Formik>
  );
}
export default AdminEditForm;

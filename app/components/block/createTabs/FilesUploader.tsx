import { ErrorMessage, Field } from "formik";
import { ChangeEvent, useState } from "react";

interface FilesUploaderProps {
  getMusicFile: File | null;
  setMusicFile: React.Dispatch<React.SetStateAction<File | null>>;
  getCoverImage: File | null;
  setCoverImage: React.Dispatch<React.SetStateAction<File | null>>;
  getArtWorkImage: File | null;
  setArtWorkImage: React.Dispatch<React.SetStateAction<File | null>>;
  getTrackVisualizer: File | null;
  setTrackVisualizer: React.Dispatch<React.SetStateAction<File | null>>;
  getProjectArtWork: File | null;
  setProjectArtWork: React.Dispatch<React.SetStateAction<File | null>>;
  uploadHandler: (
    e: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => void;
  errors: any;
  touched: any;
}

function FilesUploader({
  getMusicFile,
  setMusicFile,
  getCoverImage,
  setCoverImage,
  getArtWorkImage,
  setArtWorkImage,
  getTrackVisualizer,
  setTrackVisualizer,
  getProjectArtWork,
  setProjectArtWork,
  uploadHandler,
  errors,
  touched,
}: FilesUploaderProps) {
  return (
    <>
      {/* File input for musicFile */}
      <h4 className="title-create-item">Upload Music file</h4>
      <label
        className={`uploadFile2 ${errors.name && touched.name ? "error" : ""}`}
      >
        <span className="filename">
          {getMusicFile !== null
            ? getMusicFile?.name
            : `WAV, MP3, WAVE, MPEG, VND.AUDIOGRAPH`}
        </span>
        <input
          type="file"
          name="musicFile"
          className="inputfile form-control"
          onChange={(e: any) => uploadHandler(e, setMusicFile)}
        />
        <span>Max Size 200MB</span>
      </label>
      <ErrorMessage
        name="musicFile"
        component="div"
        className="error-message"
      />

      {/* File input for coverImage */}
      <h4 className="title-create-item">Upload Cover Image</h4>
      <label
        className={`uploadFile2 ${errors.name && touched.name ? "error" : ""}`}
      >
        <span className="filename">
          {getCoverImage !== null ? getCoverImage?.name : `JPEG, PNG, WEBP`}
        </span>
        <input
          type="file"
          name="coverImage"
          className="inputfile form-control"
          onChange={(e: any) => uploadHandler(e, setCoverImage)}
        />
        <span>Max Size 200MB</span>
      </label>
      <ErrorMessage
        name="coverImage"
        component="div"
        className="error-message"
      />

      {/* File input for artWorkImage */}
      <h4 className="title-create-item">Upload Track Artwork Image</h4>
      <label
        className={`uploadFile2 ${errors.name && touched.name ? "error" : ""}`}
      >
        <span className="filename">
          {getArtWorkImage !== null ? getArtWorkImage?.name : `JPEG, PNG, WEBP`}
        </span>
        <input
          type="file"
          name="artWorkImage"
          className="inputfile form-control"
          onChange={(e: any) => uploadHandler(e, setArtWorkImage)}
        />
        <span>Max Size 200MB</span>
      </label>
      <ErrorMessage
        name="artWorkImage"
        component="div"
        className="error-message"
      />

      {/* File input for trackVisualizer */}
      <h4 className="title-create-item">Upload Track Visualizer</h4>
      <label
        className={`uploadFile2 ${errors.name && touched.name ? "error" : ""}`}
      >
        <span className="filename">
          {getTrackVisualizer !== null
            ? getTrackVisualizer?.name
            : `WAV, MP3, WAVE, MPEG, VND.AUDIOGRAPH`}
        </span>
        <input
          type="file"
          name="trackVisualizer"
          className="inputfile form-control"
          onChange={(e: any) => uploadHandler(e, setTrackVisualizer)}
        />
        <span>Max Size 200MB</span>
      </label>
      <ErrorMessage
        name="trackVisualizer"
        component="div"
        className="error-message"
      />

      {/* File input for projectArtWork */}
      <h4 className="title-create-item">Upload Project Art Work</h4>
      <label
        className={`uploadFile2 ${errors.name && touched.name ? "error" : ""}`}
      >
        <span className="filename">
          {getProjectArtWork !== null
            ? getProjectArtWork?.name
            : `JPEG, PNG, WEBP`}
        </span>
        <input
          type="file"
          name="projectArtWork"
          className="inputfile form-control"
          onChange={(e: any) => uploadHandler(e, setProjectArtWork)}
        />
        <span>Max Size 200MB</span>
      </label>
      <ErrorMessage
        name="projectArtWork"
        component="div"
        className="error-message"
      />
    </>
  );
}

export default FilesUploader;

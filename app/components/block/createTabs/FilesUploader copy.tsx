import { ChangeEvent, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface Values {
  musicFile: File | null;
  coverImage: File | null;
  artWorkImage: File | null;
  trackVisualizer: File | null;
  projectArtWork: File | null;
}

function FilesUploader() {
  const [getMusicFile, setMusicFile] = useState<File | null>(null);
  const [getCoverImage, setCoverImage] = useState<File | null>(null);
  const [getArtWorkImage, setArtWorkImage] = useState<File | null>(null);
  const [getTrackVisualizer, setTrackVisualizer] = useState<File | null>(null);
  const [getProjectArtWork, setProjectArtWork] = useState<File | null>(null);

  // upload handler
  const uploadHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ): void => {
    const file: File | null = e.target.files?.[0] || null;
    setFile(file);
  };

  return (
    <Formik
      initialValues={{
        musicFile: null,
        coverImage: null,
        artWorkImage: null,
        trackVisualizer: null,
        projectArtWork: null,
      }}
      onSubmit={(values: Values, { setSubmitting }: any) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ isSubmitting }) => (
        <div className="form-create-item ">
          <Form>
            {/* File input for musicFile */}
            <h4 className="title-create-item">Upload Music file</h4>
            <label className="uploadFile2">
              <span className="filename">
                {getMusicFile !== null
                  ? getMusicFile?.name
                  : `WAV, MP3, WAVE, MPEG, VND.AUDIOGRAPH`}
              </span>
              <input
                type="file"
                name="musicFile"
                className="inputfile form-control"
                onChange={(e) => uploadHandler(e, setMusicFile)}
              />
              <span>Max Size 200MB</span>
            </label>

            {/* File input for coverImage */}
            <h4 className="title-create-item">Upload Cover Image</h4>
            <label className="uploadFile2">
              <span className="filename">
                {getCoverImage !== null
                  ? getCoverImage?.name
                  : `JPEG, PNG, WEBP`}
              </span>
              <input
                type="file"
                name="coverImage"
                className="inputfile form-control"
                onChange={(e) => uploadHandler(e, setCoverImage)}
              />
              <span>Max Size 200MB</span>
            </label>

            {/* File input for artWorkImage */}
            <h4 className="title-create-item">Upload Track Artwork Image</h4>
            <label className="uploadFile2">
              <span className="filename">
                {getArtWorkImage !== null
                  ? getArtWorkImage?.name
                  : `JPEG, PNG, WEBP`}
              </span>
              <input
                type="file"
                name="artWorkImage"
                className="inputfile form-control"
                onChange={(e) => uploadHandler(e, setArtWorkImage)}
              />
              <span>Max Size 200MB</span>
            </label>

            {/* File input for trackVisualizer */}
            <h4 className="title-create-item">Upload Track Visualizer</h4>
            <label className="uploadFile2">
              <span className="filename">
                {getTrackVisualizer !== null
                  ? getTrackVisualizer?.name
                  : `WAV, MP3, WAVE, MPEG, VND.AUDIOGRAPH`}
              </span>
              <input
                type="file"
                name="trackVisualizer"
                className="inputfile form-control"
                onChange={(e) => uploadHandler(e, setTrackVisualizer)}
              />
              <span>Max Size 200MB</span>
            </label>

            {/* File input for projectArtWork */}
            <h4 className="title-create-item">Upload Project Art Work</h4>
            <label className="uploadFile2">
              <span className="filename">
                {getProjectArtWork !== null
                  ? getProjectArtWork?.name
                  : `JPEG, PNG, WEBP`}
              </span>
              <input
                type="file"
                name="projectArtWork"
                className="inputfile form-control"
                onChange={(e) => uploadHandler(e, setProjectArtWork)}
              />
              <span>Max Size 200MB</span>
            </label>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default FilesUploader;

import * as Yup from "yup";

const validFileExtensions: Record<string, string[]> = {
    image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
    audio: ["wav", "mp3", "wave", "mpeg", "audio/vnd.audiograph"]
};

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 100 KB in bytes

interface FileObject {
    name: string;
    size: number;
    type: string;
}

function isValidFileType(fileName: string, fileType: string) {
    const fileExtension: any = fileName.split('.').pop()?.toLowerCase();
    return fileName && validFileExtensions[fileType]?.includes(fileExtension);
}

function isValidAudioFile(value: FileObject | undefined) {
    return value && isValidFileType(value?.name?.toLowerCase(), "audio");
}

function isValidSize(value: FileObject | undefined) {
    return value && value.size <= MAX_FILE_SIZE;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
})

const EditNftInfo = Yup.object().shape({
    name: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
    // trackNo: Yup.number().required('This field is required'),
    // genre: Yup.string().required('This field is required'),
    // bpm: Yup.number().required('This field is required'),
    // externalUrl: Yup.string().required('This field is required'),
    // duration: Yup.number().required('This field is required'),
    // releaseDate: Yup.date().required('This field is required'),
    // recordLabel: Yup.string().required('This field is required'),
    // trackPublisher: Yup.string().required('This field is required'),
    // location: Yup.string().required('This field is required'),
    // lyrics: Yup.string().required('This field is required'),
    artistName: Yup.string().required('This field is required'),
    artistEmail: Yup.string().required('This field is required'),
    // projectTitle: Yup.string().required('This field is required'),
    // projectType: Yup.string().required('This field is required'),
    // projectReleaseDate: Yup.date().required('This field is required'),
    // projectRecordLabel: Yup.string().required('This field is required'),
    // projectPublisher: Yup.string().required('This field is required'),
    // projectDescription: Yup.string().required('This field is required'),
    // license: Yup.string().required('This field is required'),
    // isrc: Yup.string().required('This field is required'),
    // upc: Yup.string().required('This field is required'),
    // musicFile: Yup.mixed().required('Please upload music file.')
    //     .test("is-valid-type", "Not a valid audio type", isValidAudioFile)
    //     .test("is-valid-size", "Max allowed size is 100KB", isValidSize),
    // coverImage: Yup.mixed().required('Please upload cover image.'),
    // artWorkImage: Yup.mixed().required('Please upload track art work image.'),
    // trackVisualizer: Yup.mixed().required('Please upload track visualizer.'),
    // projectArtWork: Yup.mixed().required('Please upload project art work'),
    price: Yup.string().required('This field is required'),
    iban: Yup.string().required('This field is required'),
})

export { LoginSchema, EditNftInfo, isValidAudioFile, isValidSize }
import * as Yup from "yup";


const MusicInfoSchema = Yup.object().shape({
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
    musicFile: Yup.mixed().required('Please upload music file.'),
    coverImage: Yup.mixed().required('Please upload cover image.'),
    artWorkImage: Yup.mixed().nullable(),
    trackVisualizer: Yup.mixed().nullable(),
    projectArtWork: Yup.mixed().nullable(),
})

const PriceTabSchema = Yup.object().shape({
    price: Yup.string().required('This field is required'),
    quantity: Yup.number().min(1)
})
const BillingInfoTabSchema = Yup.object().shape({
    iban: Yup.string().required('This field is required'),
})

export { MusicInfoSchema, PriceTabSchema, BillingInfoTabSchema }
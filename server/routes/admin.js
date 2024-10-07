import express from 'express'
import multer from 'multer';
import path from 'path'
import bodyParser from 'body-parser'
import { bannerF, postBannerF, newProductF, getProductsF } from '../controllers/admin.js'

const app = express.Router();
app.use(bodyParser.json());
app.use("/banner", express.static("banner"))

//CREATE BUILDER FORM 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'banner/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });


app.get('/getBanner', bannerF)

app.post('/postBanner', upload.fields([{ name: 'profile', maxCount: 1 }]), postBannerF)

app.post('/newProduct', upload.fields([{ name: 'prodImg', maxCount: 15 }]), newProductF)

app.get('/getProducts', getProductsF)

export default app;
import express from 'express'

import { login2F, getBannerF } from '../controllers/user.js';

const app = express.Router();


app.post('/login2', login2F)

app.get('/getBanner', getBannerF)



export default app;
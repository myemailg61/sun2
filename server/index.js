const PORT = process.env.PORT || 8000

import userRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'

import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer'

const app = express()
app.use(express.json())
app.use(bodyParser.json());
app.use("/banner", express.static("banner"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'banner/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

const JWT_SECRET = 'secrET_ly@11';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sun"
})


//user apis
app.use('/user', userRoutes)

//admin apis
app.use('/admin', adminRoutes)

//login
app.post("/login", (req, res) => {
    const { mobile, password } = req.body.data
    console.log(mobile, password, "login")
    const q = "SELECT name,mobile_no,role,password,cid FROM users WHERE mobile_no=?"

    db.query(q, [mobile], (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data.length > 0) {
                if (password == data[0].password) {
                    //console.log("match")
                    const token = jwt.sign({ id: data[0].cid }, JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).json({ "data": data, "token": token })
                } else {
                    res.status(401).send("password Incorrect")
                }
            } else {
                res.status(409).send("No record found")
            }
        }
    })
})


//signup
app.post("/signup", (req, res) => {
    const { Name, email, mobile, password } = req.body.data
    let cId = uuidv4();
    console.log(Name, email, mobile, password, " sign")

    if (!Name || !email || !mobile || !password) {
        res.status(400).json({ error: "All inputs required" })
    }

    const value = [Name, mobile, email, password, cId]

    const q = "SELECT COUNT(*) AS count FROM users WHERE mobile_no=?"

    db.query(q, [mobile], (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data[0].count == 0) {
                const q2 = "INSERT INTO users (`name`,`mobile_no`,`mail`,`password`,`cid`) VALUES (?)";

                db.query(q2, [value], (err, data2) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.status(200).send("success")
                    }
                })
            } else {
                res.status(409).json({ error: "Account already exists" })
            }
        }
    })

});

app.post('/faqs', upload.fields([{ name: 'prodImg', maxCount: 15 }]), (req, res) => {
    const faqs = req.body.faqs; // Retrieve FAQs from the request body
    //console.log('Received FAQs:', faqs);
    console.log('Received FAQs:', JSON.stringify(faqs, null, 2));
    res.status(200).send({ message: 'FAQs received successfully!' });
});



app.listen(PORT, () => {
    console.log("server running...")
})
import mysql from 'mysql'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sun"
})

const bannerF = (req, res) => {
    const q = "SELECT * FROM banner WHERE status=1"

    db.query(q, (err, data) => {
        if (err) {
            res.status(400).send('error')
            console.log(err)
        } else {
            res.status(200).send(data)
        }

    })
}

const postBannerF = (req, res) => {
    if (!req.files || !req.files['profile']) {
        return res.status(400).send('No files were uploaded.');
    }
    const value = [req.files['profile'].map((file) => file.filename).join(','),]

    const q = "INSERT INTO banner (`name`) VALUES (?)"

    db.query(q, [value], (err, data) => {
        if (err) {
            res.status(400).send('Network error')
        } else {
            //console.log(data)
            res.status(200).send('success')
        }
    })
}

const newProductF = (req, res) => {
    const {
        productName, productCategory, productSubCategory1, productSubCategory2,
        price, manufacturerName, description, quantity, gst, minPurchase, documentLinks,
        location, shipping, weight, dimensions, faqs
    } = req.body;

    const productImgs = req.files['prodImg'].map((file) => file.filename).join(',')
    const faqStr = Array.isArray(faqs) || typeof faqs === 'object' ? JSON.stringify(faqs) : faqs;
    const dimensionStr = JSON.stringify(dimensions)


    // Prepare the values array
    const values = [
        productName,
        productCategory,
        productSubCategory1,
        productSubCategory2,
        price,
        manufacturerName,
        documentLinks,
        description,
        quantity,
        location,
        shipping,
        weight,
        dimensionStr,
        gst,
        minPurchase,
        productImgs,
        faqStr,
    ];

    //console.log(values, " newVal")

    // Use individual placeholders for each value
    const q = "INSERT INTO products (`name`, `category`, `subCategory1`,`subCategory2`,`price`,`manufacturerName`,`docLinks`,`description`,`quantity`,`location`,`shipping`,`prodWeight`,`dimensions`,`gst`,`minPurchase`,`prodImages`, `faq`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log(data);
            res.status(201).send("success");
        }
    });

};



const getProductsF = (req, res) => {
    const q = "SELECT * FROM products"

    db.query(q, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const faq = JSON.parse(data[0].faq)
            console.log(faq, " faq")
            res.status(200).send(faq)
        }
    })
}


export { bannerF, postBannerF, newProductF, getProductsF }
import mysql from 'mysql'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sun"
})

const login2F = (err, data) => {
    console.log("login2")
}

const getBannerF = (req, res) => {
    const q = "SELECT * FROM banner"

    db.query(q, (err, data) => {
        if (err) {
            res.status(400).send("Network Issue")
        } else {
            res.status(200).send(data)
        }
    })
}

export { login2F, getBannerF }
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
};

const getCategoryF = (req, res) => {
    const q = "SELECT category,subCategory1,subCategory2 FROM products"
    //const q = "SELECT category, GROUP_CONCAT(subCategory1 ORDER BY subCategory2) AS subCategories FROM products GROUP BY category";



    db.query(q, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send("network error")
        } else {
            //console.log(data, " cat")

            // Transform the results
            const categoryMap = {};

            data.forEach(row => {
                const { category, subCategory1, subCategory2 } = row;

                // Initialize category object if it doesn't exist
                if (!categoryMap[category]) {
                    categoryMap[category] = { category, subCategories: {} };
                }

                // Initialize the subCategory1 array if it doesn't exist
                if (!categoryMap[category].subCategories[subCategory1]) {
                    categoryMap[category].subCategories[subCategory1] = [];
                }

                // Add subCategory2 to the corresponding subCategory1
                if (!categoryMap[category].subCategories[subCategory1].includes(subCategory2)) {
                    categoryMap[category].subCategories[subCategory1].push(subCategory2);
                }
            });

            // Convert the map into the required array format
            const formattedData = Object.values(categoryMap).map(({ category, subCategories }) => {
                const subCategoryEntries = {};
                for (const [subCat1, subCat2Arr] of Object.entries(subCategories)) {
                    subCategoryEntries[subCat1] = subCat2Arr;
                }
                return {
                    category,
                    ...subCategoryEntries
                };
            });

            //console.log(formattedData, " fDta")
            res.status(200).json(formattedData)

        }  //else
    })
};

const getSubCatF = (req, res) => {
    const name = req.query.name
    if (!name) {
        res.status(500).send({ "message": "internal server error" })
    }

    const q = "SELECT id,name,price,prodImages FROM products WHERE subCategory1=?"

    db.query(q, [name], (err, data) => {
        if (err) {
            res.status(400).send("internal server error")
        } else {
            res.status(201).send(data)
        }
    })
};


const prodDetailsF = (req, res) => {
    const { id } = req.params

    const q = "SELECT * FROM products WHERE id=?"

    db.query(q, [id], (err, data) => {
        if (err) {
            res.status(500).send({ "message": err.message })
        } else {
            res.status(201).send(data)
        }
    })
}








export { login2F, getBannerF, getCategoryF, getSubCatF, prodDetailsF }
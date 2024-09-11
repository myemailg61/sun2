const PORT = process.env.PORT || 8000
import express from 'express'

const app = express()



app.listen(PORT, () => {
    console.log("server running...")
})
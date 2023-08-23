require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())
app.use('/api/stocks', require('./routes/stock-route'))
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        code: 500,
        message: err.message
    })
})

mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('Connected to mongodb'))
.catch((err) => console.log(err))

app.listen(port, () => {
    console.log(`server is running in port ${port}`)
})
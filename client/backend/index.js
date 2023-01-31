require('dotenv').config()
const { ObjectID } = require("mongodb")
const express=require("express")
const mongoose = require('mongoose')
const raceRoutes = require('./routes/races')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// routes 
app.use('/Race', raceRoutes)


//DB CONNECTION listen for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT,()=>{
            console.log('connected to db & on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



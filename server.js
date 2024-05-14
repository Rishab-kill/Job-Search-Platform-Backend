require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')
const authRoute = require("./routes/auth")
const jobRoute = require("./routes/job")
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())

const PORT = 3001;

app.get('/health',(req,res)=>{
    console.log("I am in Health API...");
    res.json({
        service:"Backend Job Listining API Service",
        status:"active",
        time:new Date()
    })
});

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/job",jobRoute);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({errorMessage:"something went wrong"})
})

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Db connected !")
    })
    .catch((err)=>{
        console.log("Db failed to connect",err)
    })

app.listen(PORT,()=>{
    console.log(`Backend server listining at port :${PORT}`)
});
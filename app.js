const express = require('express');
const app = new express();
const router = require('./src/routes/api');



// Security module import

const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const xss = require('xss-clean')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// Security module implement
app.use(cors())
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())
app.use(xss())
app.use(bodyParser.json())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)

app.use("/api",router)
app.use('*',(req,res)=>{
	
    res.status(404).json({status:"fail", message:"Invalid URL"})
})

module.exports = app;
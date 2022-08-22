// import express
const express = require('express');

// import mongoose
const mongoose = require('mongoose');

// import body-parser
const bodyParser = require('express');

// inisiasi express sebagai app
const app = express();

// setup body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// connect to mongodb
mongoose.connect('mongodb://localhost/resthub')
const db = mongoose.connection;

// setting port
const port = 8000;

// import module api route
const apiRouter = require("./api-routes.js");

// setup default url di root
app.get('/', (req, res) => {
    res.send('Hello, Welcome to My Web Server');
})

// api route ke url /api
app.use("/api", apiRouter);

// launch app with info at console log
app.listen(port, () => {
    console.log(`server berjalan di port ${port}`);
})
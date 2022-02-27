require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const bloodsRoute = require('./src/bloods/routes');
const citiesRoute = require('./src/cities/routes');
const contactRoute = require('./src/contacts/routes');
const port = process.env.port;
const host = process.env.host;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bloodsRoute).use(citiesRoute).use(contactRoute);

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.listen(port, ()=>{
    console.info(`App listen on http://${host}:${port}`)
})
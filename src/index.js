const express = require('express');
const app = express();
const scrapers = require("./scraper");

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.post("/search", async(req, res) => {
    console.log(req.body);
    const jobData = await scrapers.scrapeChannel(req.body.customURL, req.body.techInput);
    res.send(jobData);
});

app.listen(2323, () => {

    console.log('server is started')
})
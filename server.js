const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const httpPort = 3000;

app.listen(httpPort, function () {
    console.log(`HTTP listening on port: ${httpPort}`);
});

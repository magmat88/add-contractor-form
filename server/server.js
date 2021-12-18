// const https = require('https');
const express = require('express');
const port = 60001;
const app = express();

// https.createServer(app).listen(port);

// https.createServer((req, res) => {
//     res.status(404);
//     res.send("Nie znaleziono metody zapisu.");
// });

app.post('/Contractor/Save', (req, res) => {
    res.status(404);
    res.send('Nie znaleziono metody zapisu.');
});

app.listen(port, () => {});

//package.json: add in scripts: "server": "nodemon \"server/server.js\" --ignore client",
//package.json: change proxy:     "proxy": "https://localhost:60001"


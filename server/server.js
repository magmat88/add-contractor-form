const express = require("express");
const port = 60001;
const app = express();


app.post('/Contractor/Save', (req, res) => {
    res.status(404);
    res.send("Nie znaleziono metody zapisu.");
})

app.listen(port, () => {
});
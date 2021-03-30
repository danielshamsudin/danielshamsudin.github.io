const express = require("express");
const cors = require("cors");
const app = express();

var corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application. " });
});

//game page
app.get("/find-the-invisible-dog", (req, res) => {
    res.sendFile(__dirname + '/find-the-invisible-dog/index.html');

    app.use(express.static(__dirname + '/find-the-invisible-dog/'));
});

app.get("/e-motion", (req, res) => {
    res.sendFile(__dirname + '/e-motion/index.html');

    app.use(express.static(__dirname + '/e-motion/'));
});

require("./router/router")(app);

const PORT = process.env.PORT || 50; // change the port number
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}. `);
});
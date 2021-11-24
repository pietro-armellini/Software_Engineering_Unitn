const express = require("express");
//const bodyParser = require("body-parser"); /deprecated
const cors = require("cors");
const db = require("./app/models");

//----------------------
//database syncing

//for production
//db.sequelize.sync();

//for development
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
//----------------------

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); //bodyparser deprecated

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to G06 middleware." });
});

//add routes
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
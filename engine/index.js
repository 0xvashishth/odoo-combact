const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const bodyParser = require("body-parser");
const commonR = require("./routes");

var whitelist = ["https://localhost:3000/", "http://localhost:3000" , "http://localhost:3000/"];
var corsOptions = {
  origin: function (origin, callback) {
    console.log("Request comed");
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// cors
app.use(cors(corsOptions));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json());


// routers
app.use("/api/v1", commonR);

// Middleware
const middleware = (req, res, next) => {
  console.log("Hello my middleware");
  next();
};
// middleware();

app.get("/", (req, res) => {
  console.log("Hello odoo!!");
  res.send("Hello odoo!!");
});

app.get("/contact", middleware, (req, res) => {
  console.log("Hello my contact");
  res.send("Hello Contact");
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
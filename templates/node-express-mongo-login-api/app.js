const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// dotenv.config({ path: "./.env" });
require("dotenv").config();

const app = express();

//middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// conncet database
connectDB();

//All routers

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/auth", require("./routes/authRoute"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

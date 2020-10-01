const mongoose = require("mongoose");
const config = require("config");
const db = config.get("DATABASE_URI");
// DB connection

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Atlas connected.....!!!");
  } catch (error) {
    console.log(error);
    // exit process with fail
    process.exit(1);
  }
};

module.exports = connectDB;

//go to mongoDB atlas, create an acount, create a database and keep those username, password and database name handy,
//Now in default.json file replace your mongoDB atlast username, password and database name with <username>, <password> and <dbname>

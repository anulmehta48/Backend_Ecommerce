const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("./models/user.model");
const bcrypt = require("bcrypt");
const router = require("./routes/auth.routes");
const URI = process.env.DB_USER;

app.use(express.json())

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB is Connected");
    init();
  })
  .catch((err) => {
    console.log(err);
  });

async function init() {
  try {
    let user = await userModel.findOne({ userId: "admin" });
    if (user) {
      console.log("Admin is alredy present");
      return;
    }
  } catch (error) {
    console.log("Error while read database", error);
  }
  try {
    user = await userModel.create({
      name: "Anul",
      userId: "admin",
      email: "anul5478@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Welcome2", 10),
    });
    console.log("Admin created ", user);
  } catch (error) {
    console.log("Error while create admin ", error);
  }
}


app.use('/',router)

app.listen(3000, () => {
  console.log("Server is running on port " + 3000);
});

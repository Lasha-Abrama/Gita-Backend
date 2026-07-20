const mongoose = require("mongoose");

async function connectToDb() {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined");
  }

  await mongoose.connect(mongoUrl);
  console.log("MongoDB connected successfully");
}

module.exports = connectToDb;

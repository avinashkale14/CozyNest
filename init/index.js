require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const dbUrl = process.env.DB_URL;

async function main() {
  await mongoose.connect(dbUrl);
  console.log("DB Connected ✅");
}

main()
  .then(initDB)
  .catch(console.log);

async function initDB() {
  await Listing.deleteMany({});

  const data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a6eda3ebedfb9fbaea6e55f" // तुझा owner id
  }));

  await Listing.insertMany(data);

  console.log("Database Initialized ✅");
  mongoose.connection.close();
}
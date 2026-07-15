require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const dbUrl = process.env.DB_URL; // ✅ correct variable

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("DB Connected ✅");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});

  // ⚠️ TEMP: no owner to avoid crash
  const dataWithoutOwner = initData.data.map((obj) => ({
    ...obj,
    owner: null,
  }));

  await Listing.insertMany(dataWithoutOwner);

  console.log("Data Inserted ✅");
};

initDB();
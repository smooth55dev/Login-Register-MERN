const mongoose = require("mongoose");

async function DbConnect() {
  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(process.env.DB_URL);
  // const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log("Database Connected");
  return db;
}

module.exports = DbConnect;

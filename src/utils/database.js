require("dotenv").config();
const { connect } = require("mongoose");

async function connectDatabase() {
  try {
    await connect(process.env.DATABASE_URI);
    console.log("Database connection successfull");
  } catch (err) {
    console.error(err);
    throw new Error("Database connection failed");
  }
}

module.exports = connectDatabase;

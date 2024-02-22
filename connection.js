const mongoose = require("mongoose");

const connectToDB = async () =>
  await mongoose.connect(
    `${process.env.MONGODB_BASE_URL}/otp_user_verify_app`,
  );

module.exports = connectToDB;

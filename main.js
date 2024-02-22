const express = require("express");
const {mongoose} = require("mongoose")
require("dotenv").config();
const app = express();

const port = process.env.PORT || 8082;
app.use(express.json());

mongoose.connect(
    `${process.env.MONGODB_BASE_URL}/otp_user_verify_app`,
  );


app.use("/", require("./routes/router"));

app.listen(port, () => {
  console.info(`Server is running on ${port}`);
});

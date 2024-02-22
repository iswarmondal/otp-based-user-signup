const express = require("express");
const { connectToDB } = require("./connection");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 8082;
app.use(express.json());
// connectToDB();

app.use("/", require("./routes/router"));

app.listen(port, () => {
  console.info(`Server is running on ${port}`);
});

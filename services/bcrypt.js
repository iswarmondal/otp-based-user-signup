const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateHash = (data) => {
  bcrypt.genSalt(saltRounds).then((salt) => {
    bcrypt.hash(data, salt)
      .then((hash) => hash)
      .catch((e) => {
        console.log(e);
      });
  });
};

const compareWithHash = (hash, data) => {
  bcrypt.compare(data, hash)
    .then((res) => res)
    .catch((e) => console.log(e));
};

module.exports = { generateHash, compareWithHash };

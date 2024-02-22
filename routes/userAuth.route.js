const router = require("express").Router();
const User = require("../schema/userSchema");
const { generateHash } = require("../services/bcrypt");

// CREATE NEW USER IF NOT ALREADY EXIST
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const isExist = await User.findOne({ email });

  if (isExist) {
    return res.send({ success: false, message: "User already exist" });
  }

  const passwordHash = generateHash(password);

  const otp = (Math.random() * 1000000).toFixed();

  const newUser = await User.create({
    email,
    password: passwordHash,
    otp,
    isVerified: false,
  });

  res.send({ success: true, message: `New user created with email ${email}` });
});

// VERIFY USER USING THE OTP SEND THROUGH POST REQUEST
router.post("/verify-user", async (req, res) => {
  const { email, otp } = req.body;

  const userData = await User.findOne({ email });

  if (!userData) {
    return res.send({
      success: false,
      message: `No user found with email ${email}`,
    });
  }

  if (userData && userData.otp !== otp) {
    return res.send({ success: false, message: `Invalid OTP` });
  }

  if (userData && userData.otp === otp) {
    const updatedUser = await User.findByIdAndUpdate(userData._id, {
      isVerified: true,
    });

    res.send({
      success: true,
      message: `User with email ${email} is verified`,
      data: updatedUser,
    });
  }
});

module.exports = router;

const router = require("express").Router();

router.use("/user-auth", require("./userAuth.route"));

module.exports = router;

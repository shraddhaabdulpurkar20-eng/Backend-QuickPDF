const express = require("express");
const { signup, signin } = require("../controllers/auth");
const { requireSignin } = require("../common-middleware/index.js")

const {
  validteSignupRequest,
  isRequestValidated,
  validteSigninRequest,

} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validteSignupRequest, isRequestValidated, signup);
router.post("/signin", validteSigninRequest, isRequestValidated, signin);

router.post("/profile", requireSignin, (req, res) => {
  res.status(200).json({ user: "profile" });
});

module.exports = router;

const express = require("express");
const { signup, signin } = require("../controllers/auth");
const { requireSignin } = require("../common-middleware/index.js");

const {
  validteSignupRequest,
  isRequestValidated,
  validteSigninRequest,
} = require("../validators/auth");

const router = express.Router();

// ✅ Signup
router.post("/signup", validteSignupRequest, isRequestValidated, signup);

// ✅ Signin
router.post("/signin", validteSigninRequest, isRequestValidated, signin);

// ✅ Profile (protected)
router.post("/profile", requireSignin, (req, res) => {
  res.status(200).json({ user: "profile" });
});

// 🔥 ✅ VERIFY ENDPOINT (NEW)
router.post("/verify", requireSignin, (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User verified successfully",
      user: req.user, // comes from requireSignin middleware
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Verification failed",
    });
  }
});

module.exports = router;
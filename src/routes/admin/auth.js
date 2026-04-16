const express = require("express");
const { signup, signin } = require("../../controllers/admin/auth");
const {
  validteSigninRequest,
  validteSignupRequest,
  isRequestValidated,
} = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signup", validteSignupRequest, isRequestValidated, signup);
router.post("/admin/signin", validteSigninRequest, isRequestValidated, signin);

module.exports = router;

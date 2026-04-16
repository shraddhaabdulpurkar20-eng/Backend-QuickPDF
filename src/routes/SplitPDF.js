

const express = require("express");
const router = express.Router();
const { upload } = require("../common-middleware/index");

const { splitPDF } = require("../controllers/splitPDF");

router.post("/split", upload.single("file"), splitPDF);

module.exports = router;
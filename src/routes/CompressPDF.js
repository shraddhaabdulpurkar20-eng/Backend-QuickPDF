const express = require("express");
const router = express.Router();
const { upload } = require("../common-middleware");
const { CompressPDF } = require("../controllers/CompressPDF");

router.post("/Compress", upload.single("file"), CompressPDF);

module.exports = router;
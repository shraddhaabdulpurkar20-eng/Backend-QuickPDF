

const express = require("express");
const router = express.Router();
const { upload } = require("../common-middleware/index");
const multer = require("multer")
// const upload = multer({ dest: "uploads/" });

const { ConvertPDF } = require("../controllers/ConvertPDF");

router.post("/convertPDF", upload.single("file"), ConvertPDF);

module.exports = router;




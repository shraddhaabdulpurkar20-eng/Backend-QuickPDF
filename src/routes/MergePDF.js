const express = require("express");
const router = express.Router();
const { upload } = require("../common-middleware/index");

const { mergePDF } = require("../controllers/MergePDF");

router.post("/merge-pdf", upload.array("file"), mergePDF);

module.exports = router;
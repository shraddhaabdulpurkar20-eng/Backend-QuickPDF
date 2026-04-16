
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const mergePDFSchema = new mongoose.Schema(
    {
        fileNames: [String],
        mergedFileUrl: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("mergePDF", mergePDFSchema);
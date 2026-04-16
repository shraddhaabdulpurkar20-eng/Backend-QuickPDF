
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const splitPDFSchema = new mongoose.Schema(
    {
        originalFileName: {
            type: String,
            required: true,
        },
        splitFiles: [
            {
                pageNumber: Number,
                fileUrl: String,
            },
        ],
        totalPages: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("SplitPDF", splitPDFSchema);
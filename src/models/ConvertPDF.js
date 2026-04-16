


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ConvertPDFSchema = new mongoose.Schema(
    {
        originalFileName: {
            type: String,
            required: true,
        },
        convertedFileUrl: {
            type: String,
            required: true,
        },
        inputFormat: {
            type: String, // docx, xlsx, jpg, png
            required: true,
        },
        outputFormat: {
            type: String,
            default: "pdf",
        },
        fileSize: {
            type: Number, // original file size (bytes)
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ConvertPDF", ConvertPDFSchema);


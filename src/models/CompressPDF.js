

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const compressPDFSchema = new mongoose.Schema(
    {
        originalFileName: {
            type: String,
            required: true,
        },
        compressedFileUrl: {
            type: String,
            required: true,
        },
        quality: {
            type: String,
            enum: ["screen", "ebook", "printer", "prepress"],
            default: "ebook",
        },
        originalSize: {
            type: Number, // in bytes
        },
        compressedSize: {
            type: Number, // in bytes
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CompressPDF", compressPDFSchema);


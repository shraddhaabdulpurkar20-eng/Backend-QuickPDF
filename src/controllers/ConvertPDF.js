
const fs = require("fs");
const path = require("path");

const ConvertPDFService = require("../services/ConvertPDFService");


exports.ConvertPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const inputPath = req.file.path; // ✅ use this directly
        const outputDir = "uploads";

        const outputPath = await ConvertPDFService(inputPath, outputDir);

        res.download(outputPath);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Conversion failed",
            error: error.message,
        });
    }
};


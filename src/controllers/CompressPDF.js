
const fs = require("fs");
const path = require("path");
const CompressPDFModel = require("../models/CompressPDF");
const CompressPDFService = require("../services/CompressPDFService");

exports.CompressPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const inputPath = req.file.path;

        // ✅ Validate PDF (REAL CHECK)
        const buffer = fs.readFileSync(inputPath);
        const header = buffer.toString("utf8", 0, 5);

        if (header !== "%PDF-") {
            return res.status(400).json({
                message: "Invalid PDF file",
            });
        }

        const outputPath = path.join(
            "uploads",
            "compressed_" + Date.now() + ".pdf"
        );

        await CompressPDFService(inputPath, outputPath);

        const originalSize = fs.statSync(inputPath).size;
        const compressedSize = fs.statSync(outputPath).size;

        // ✅ Save to DB
        await CompressPDFModel.create({
            originalFileName: req.file.originalname,
            compressedFileUrl: outputPath,
            quality: "ebook",
            originalSize,
            compressedSize,
        });

        return res.download(outputPath);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Compression failed",
            error: error.message,
        });
    }
};
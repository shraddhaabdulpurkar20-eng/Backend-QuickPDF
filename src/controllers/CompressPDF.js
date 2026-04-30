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

        // ✅ Validate PDF
        const buffer = fs.readFileSync(inputPath);
        if (buffer.toString("utf8", 0, 5) !== "%PDF-") {
            fs.unlinkSync(inputPath);
            return res.status(400).json({ message: "Invalid PDF file" });
        }

        const quality = (req.body.quality || "ebook").trim().toLowerCase();

        const outputPath = path.join(
            "uploads",
            `compressed_${Date.now()}.pdf`
        );

        await CompressPDFService(inputPath, outputPath, quality);

        const originalSize = fs.statSync(inputPath).size;
        const compressedSize = fs.statSync(outputPath).size;

        let finalPath = outputPath;
        let finalSize = compressedSize;
        let reduction = 0;

        if (compressedSize >= originalSize) {
            finalPath = inputPath;
            finalSize = originalSize;
        } else {
            reduction = (
                ((originalSize - compressedSize) / originalSize) * 100
            ).toFixed(0);

            await CompressPDFModel.create({
                originalFileName: req.file.originalname,
                compressedFileUrl: outputPath,
                quality,
                originalSize,
                compressedSize,
            });

            fs.unlinkSync(inputPath);
        }

        // ✅ SEND HEADERS
        res.setHeader("X-Original-Size", originalSize);
        res.setHeader("X-Compressed-Size", finalSize);
        res.setHeader("X-Reduction", reduction);

        return res.download(finalPath);

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Compression failed",
            error: err.message,
        });
    }
};
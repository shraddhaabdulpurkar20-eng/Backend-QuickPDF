

const { version } = require("mongoose");
const splitPDF = require("../models/SplitPDF")

const { PDFDocument } = require("pdf-lib");


const fs = require("fs");
const path = require("path");
const { splitPDFService } = require("../services/splitPDFService");

exports.splitPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // ✅ Define baseURL here, inside the function
        const baseURL = `${req.protocol}://${req.get("host")}`;

        const filePath = req.file.path;
        const splitFiles = await splitPDFService(filePath);

        const fileURLs = splitFiles.map(f => `${baseURL}/${f.replace(/\\/g, "/")}`);

        res.status(200).json({
            message: "PDF split successfully",
            files: fileURLs
        });

    } catch (err) {
        console.error("Split PDF Error:", err);
        res.status(500).json({ message: "Error splitting PDF", error: err.message });
    }
};
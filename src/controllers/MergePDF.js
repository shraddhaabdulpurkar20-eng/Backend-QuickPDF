
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

exports.mergePDF = async (req, res) => {
    try {
        console.log("FILES:", req.files);

        if (!req.files || req.files.length < 2) {
            return res.status(400).json({
                message: "Please upload at least 2 PDF files",
            });
        }

        const mergedPdf = await PDFDocument.create();

        for (const file of req.files) {
            try {
                console.log("Reading file:", file.path);

                const fileBuffer = fs.readFileSync(file.path);

                const pdf = await PDFDocument.load(fileBuffer, {
                    ignoreEncryption: true,
                });

                const pages = await mergedPdf.copyPages(
                    pdf,
                    pdf.getPageIndices()
                );

                pages.forEach((page) => mergedPdf.addPage(page));

            } catch (err) {
                console.error("Error in single file:", err);

                return res.status(400).json({
                    message:
                        "One of the PDFs is corrupted or password protected.",
                });
            }
        }

        const mergedPdfBytes = await mergedPdf.save();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=merged.pdf");

        return res.send(mergedPdfBytes);

    } catch (error) {
        console.error("Merge PDF Error FULL:", error);

        return res.status(500).json({
            message: error.message || "Server error while merging PDFs",
        });
    }
};
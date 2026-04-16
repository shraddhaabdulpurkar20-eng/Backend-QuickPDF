
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const CompressPDF = async (inputPath, outputPath) => {
    const existingPdfBytes = fs.readFileSync(inputPath);

    // ✅ Validate PDF header
    const header = existingPdfBytes.toString("utf8", 0, 5);
    if (header !== "%PDF-") {
        throw new Error("Invalid PDF file");
    }

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);

    const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
    });

    fs.writeFileSync(outputPath, pdfBytes);
    return outputPath;
};

module.exports = CompressPDF;
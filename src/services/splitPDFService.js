const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const path = require("path");

exports.splitPDFService = async (filePath) => {
    if (!fs.existsSync(filePath)) {
        throw new Error("File does not exist");
    }

    const fileBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(fileBytes);

    const numPages = pdfDoc.getPageCount();
    const splitFiles = [];

    for (let i = 0; i < numPages; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();

        const outputPath = path.join("uploads", `page-${i + 1}.pdf`);
        fs.writeFileSync(outputPath, pdfBytes);

        splitFiles.push(outputPath);
    }

    return splitFiles; // array of file paths
};


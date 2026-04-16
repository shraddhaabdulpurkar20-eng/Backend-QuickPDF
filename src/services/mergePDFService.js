const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

exports.mergePDFService = async (files, outputPath) => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        // ✅ Read file properly
        const pdfBytes = fs.readFileSync(file.path);

        const pdf = await PDFDocument.load(pdfBytes);

        const copiedPages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
        );

        copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
        });
    }

    const mergedPdfBytes = await mergedPdf.save();

    fs.writeFileSync(outputPath, mergedPdfBytes);

    return outputPath;
};


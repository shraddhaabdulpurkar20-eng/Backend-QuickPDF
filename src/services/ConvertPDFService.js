
const { exec } = require("child_process");
const path = require("path");

const ConvertPDFService = (inputPath, outputDir) => {
    return new Promise((resolve, reject) => {
        const command = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`;
        exec(command, (error) => {
            if (error) {
                reject(error);
            } else {
                const fileName = path.basename(inputPath).split(".")[0] + ".pdf";
                const outputPath = path.join(outputDir, fileName);
                resolve(outputPath);
            }
        });
    });
};

module.exports = ConvertPDFService;
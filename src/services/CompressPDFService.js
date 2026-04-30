const { exec } = require("child_process");

const CompressPDF = (inputPath, outputPath, quality = "ebook") => {
    return new Promise((resolve, reject) => {
        const cmd = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${quality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

        exec(cmd, (error) => {
            if (error) return reject(error);
            resolve(outputPath);
        });
    });
};

module.exports = CompressPDF;
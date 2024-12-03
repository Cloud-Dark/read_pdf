const express = require('express');
const PDFParser = require('pdf2json');
const axios = require('axios');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/read', async (req, res) => {
    const link = req.query.link;

    if (!link) {
        return res.status(400).send('Error: Parameter "link" tidak ditemukan.');
    }

    try {
        // Unduh file PDF dari URL
        const response = await axios.get(link, { responseType: 'arraybuffer' });
        const pdfBuffer = response.data;

        // Simpan PDF ke file sementara
        const tempFilePath = './temp.pdf';
        fs.writeFileSync(tempFilePath, pdfBuffer);

        // Parse PDF
        const pdfParser = new PDFParser();

        pdfParser.on('pdfParser_dataReady', (pdfData) => {
            // Hapus file sementara setelah parsing selesai
            fs.unlinkSync(tempFilePath);

            // Ekstrak teks dari PDF
            const extractedData = pdfData.Pages.map((page, index) => {
                const pageContent = page.Texts.map(textObj =>
                    decodeURIComponent(
                        textObj.R.map(textRun => textRun.T).join(' ')
                    )
                ).join(' ');

                return {
                    pageNumber: index + 1,
                    content: pageContent.trim(),
                };
            });

            // Kirim hasil parsing sebagai JSON
            res.json(extractedData);
        });

        pdfParser.on('pdfParser_dataError', (errData) => {
            // Hapus file sementara jika terjadi error
            fs.unlinkSync(tempFilePath);
            res.status(500).send(`Error: ${errData.parserError}`);
        });

        pdfParser.loadPDF(tempFilePath);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

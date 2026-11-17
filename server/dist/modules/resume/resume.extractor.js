import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";
import * as mammoth from "mammoth";
class ResumeExtractor {
    async extractText(filePath, mimeType) {
        if (mimeType === "application/pdf") {
            return this.extractPdfText(filePath);
        }
        if (mimeType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return this.extractDocxText(filePath);
        }
        throw new Error("Unsupported resume format. Upload a PDF or DOCX file.");
    }
    async extractPdfText(filePath) {
        const fileBuffer = await readFile(filePath);
        const parser = new PDFParse({
            data: new Uint8Array(fileBuffer),
        });
        try {
            const result = await parser.getText();
            const text = result.text.trim();
            if (!text) {
                throw new Error("No readable text found in this PDF. Scanned PDFs require OCR.");
            }
            return text;
        }
        finally {
            await parser.destroy();
        }
    }
    async extractDocxText(filePath) {
        const result = await mammoth.extractRawText({
            path: filePath,
        });
        const text = result.value.trim();
        if (!text) {
            throw new Error("No readable text found in this DOCX file.");
        }
        return text;
    }
}
export default new ResumeExtractor();

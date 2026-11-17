
import path from "node:path";

import resumeRepository from "./resume.repository.js";
import resumeExtractor from "./resume.extractor.js";
import type { CreateResumeDto } from "./resume.types.js";

class ResumeService {
  async uploadResume(userId: string, data: CreateResumeDto) {
    // Resolve the uploaded file's location on disk.
    const filePath = path.resolve(process.cwd(), data.fileUrl);

    // Extract readable text from the PDF or DOCX file.
    const extractedText = await resumeExtractor.extractText(
      filePath,
      data.mimeType
    );

    // Save resume metadata and extracted text in PostgreSQL.
    return resumeRepository.createResume({
      ...data,
      userId,
      extractedText,
    });
  }

  async getUserResumes(userId: string) {
    return resumeRepository.getUserResumes(userId);
  }
}

export default new ResumeService();

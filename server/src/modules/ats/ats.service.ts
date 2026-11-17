import atsRepository from "./ats.repository.js";
import resumeRepository from "../resume/resume.repository.js";
import atsEngine from "./ats.engine.js";
import { createATSAnalysisSchema } from "./ats.validation.js";

class ATSService {
  async createATSAnalysis(data: unknown, userId: string) {
    // 1. Validate incoming data
    const validatedData = createATSAnalysisSchema.parse(data);

    // 2. Find the resume belonging to this user
    const resume = await resumeRepository.getResumeForAnalysis(
      validatedData.resumeId,
      userId
    );

    if (!resume) {
      throw new Error("Resume not found.");
    }

    // 3. Check whether extracted resume text exists
    if (!resume.extractedText.trim()) {
      throw new Error(
        "This resume has no extracted text. Please upload it again."
      );
    }

    // 4. Analyze resume against the job description
    const analysis = atsEngine.analyze(
      resume.extractedText,
      validatedData.jobDescription
    );

    // 5. Save the analysis in PostgreSQL
    return atsRepository.createATSAnalysis({
      ...validatedData,
      ...analysis,
      userId,
    });
  }

  async getUserATSAnalyses(userId: string) {
    return atsRepository.getUserATSAnalyses(userId);
  }

  async getATSAnalysisById(id: string, userId: string) {
    return atsRepository.getATSAnalysisById(id, userId);
  }

  async deleteATSAnalysis(id: string, userId: string) {
    return atsRepository.deleteATSAnalysis(id, userId);
  }
}

export default new ATSService();
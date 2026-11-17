
import apiClient from "../../api/client";

import type {
  Resume,
  ATSAnalysis,
  CreateATSAnalysisPayload,
  UploadResumeResponse,
  ResumeListResponse,
  ATSAnalysisResponse,
  ATSAnalysisListResponse,
} from "./resume.types";

class ResumeService {
  // Upload a PDF or DOCX resume
  async uploadResume(file: File, title?: string): Promise<Resume> {
    const formData = new FormData();

    formData.append("resume", file);

    if (title?.trim()) {
      formData.append("title", title.trim());
    }

    const response = await apiClient.post<UploadResumeResponse>(
      "/resume",
      formData
    );

    return response.data.data;
  }

  // Retrieve all uploaded resumes
  async getResumes(): Promise<Resume[]> {
    const response = await apiClient.get<ResumeListResponse>("/resume");

    return response.data.data;
  }

  // Analyze a resume against a job description
  async analyzeResume(
    payload: CreateATSAnalysisPayload
  ): Promise<ATSAnalysis> {
    const response = await apiClient.post<ATSAnalysisResponse>(
      "/ats",
      payload
    );

    return response.data.data;
  }

  // Retrieve ATS analysis history
  async getAnalysisHistory(): Promise<ATSAnalysis[]> {
    const response = await apiClient.get<ATSAnalysisListResponse>("/ats");

    return response.data.data;
  }

  // Retrieve one specific analysis
  async getAnalysisById(id: string): Promise<ATSAnalysis> {
    const response = await apiClient.get<ATSAnalysisResponse>(
      `/ats/${id}`
    );

    return response.data.data;
  }

  // Delete an ATS analysis
  async deleteAnalysis(id: string): Promise<void> {
    await apiClient.delete(`/ats/${id}`);
  }
}

export default new ResumeService();

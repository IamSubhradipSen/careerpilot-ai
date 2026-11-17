export interface Resume {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  mimeType: string | null;
  fileSize: number | null;
  uploadedAt: string;
}

export interface ATSAnalysis {
  id: string;
  resumeId: string;
  jobDescription: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  createdAt: string;
}

export interface UploadResumeResponse {
  success: boolean;
  message: string;
  data: Resume;
}

export interface ResumeListResponse {
  success: boolean;
  message: string;
  data: Resume[];
}

export interface ATSAnalysisResponse {
  success: boolean;
  message: string;
  data: ATSAnalysis;
}

export interface ATSAnalysisListResponse {
  success: boolean;
  message: string;
  data: ATSAnalysis[];
}

export interface CreateATSAnalysisPayload {
  resumeId: string;
  jobDescription: string;
}
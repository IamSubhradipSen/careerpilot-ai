
export interface CreateResumeDto {
  title: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  userId: string;
  extractedText?: string;
}

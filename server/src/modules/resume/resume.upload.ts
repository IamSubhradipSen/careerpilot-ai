
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { randomUUID } from "node:crypto";

const uploadDirectory = path.resolve("uploads/resumes");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${randomUUID()}${extension}`;

    callback(null, uniqueName);
  },
});

const allowedFiles: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback
) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const expectedMimeType = allowedFiles[extension];

  if (!expectedMimeType || file.mimetype !== expectedMimeType) {
    return callback(
      new Error("Only valid PDF and DOCX file types are allowed.")
    );
  }

  callback(null, true);
};

const resumeUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

export default resumeUpload;

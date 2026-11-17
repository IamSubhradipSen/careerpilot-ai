import { unlink } from "node:fs/promises";
import path from "node:path";
import resumeService from "./resume.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";
class ResumeController {
    async createResume(req, res) {
        const file = req.file;
        if (!file) {
            return sendResponse(res, 400, {
                success: false,
                message: "Please upload a resume file.",
            });
        }
        try {
            const title = typeof req.body.title === "string" && req.body.title.trim()
                ? req.body.title.trim()
                : path.parse(file.originalname).name;
            const resume = await resumeService.uploadResume(req.user.id, {
                title,
                fileName: file.originalname,
                fileUrl: path
                    .relative(process.cwd(), file.path)
                    .replace(/\\/g, "/"),
                mimeType: file.mimetype,
                fileSize: file.size,
                userId: req.user.id,
            });
            return sendResponse(res, 201, {
                success: true,
                message: "Resume uploaded successfully.",
                data: resume,
            });
        }
        catch (error) {
            await unlink(file.path).catch(() => undefined);
            throw error;
        }
    }
    async getUserResumes(req, res) {
        const resumes = await resumeService.getUserResumes(req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "Resumes fetched successfully.",
            data: resumes,
        });
    }
}
export default new ResumeController();

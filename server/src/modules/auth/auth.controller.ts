import { Request, Response } from "express";
import { AuthRequest } from "../../shared/middleware/auth.middleware.js";
import authService from "./auth.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";

class AuthController {
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);

    return sendResponse(res, 201, {
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);

    return sendResponse(res, 200, {
      success: true,
      message: "Login successful",
      data: result,
    });
  }

  async me(req: AuthRequest, res: Response) {
    const user = await authService.getCurrentUser(req.user!.id);

    return sendResponse(res, 200, {
      success: true,
      message: "Current user fetched successfully",
      data: user,
    });
  }
}

export default new AuthController();
import type { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
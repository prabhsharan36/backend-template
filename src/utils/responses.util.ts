import { Response } from "express";
export function internalError(res: Response, message?: string) {
  return res.status(500).json({
    success: false,
    message,
  });
}

import { Response } from "express";
import { HttpException } from "../exceptions";

export default (err: HttpException, res: Response) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
};

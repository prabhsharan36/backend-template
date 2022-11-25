// import { Request, Response, NextFunction } from "express";
// export default async function (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { method, path } = req;
//     const log = {
//       url: req.url,
//       headers: req.headers,
//       body: req.body,
//       host: req.get("origin"),
//       timestamp: Date.now(),
//     };
//     console.log("\x1b[33m%s\x1b[0m", `${method} ${path}`, JSON.stringify(log));
//   } catch (error) {
//     console.log("Failed to log request", req.url);
//   }
//   next();
// }

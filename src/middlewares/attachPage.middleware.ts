import { Page } from "../entity/page.entity";
import cls from "../plugins/cls";
import { AppDataSource } from "../loaders/dataSource";
import errorHandler from "./errorHandler";
import BadRequestException from "../exceptions/badRequest.exception";

export default async function (req: any, _res: any, next: any) {

  if (!req.header("X-PUBLIC-URL")) {
    errorHandler(new BadRequestException("X-PUBLIC-URL not provided"), _res);
  } else {
    const urlComponents = new URL(req.header("X-PUBLIC-URL"));
    if (urlComponents?.pathname.length > 0) {
      const OriginalURL = urlComponents.pathname;
      /**
       * Last character should not be equals to '/'
       */
      urlComponents.pathname =
        urlComponents.pathname.substring(urlComponents.pathname.length - 1) ===
        "/"
          ? urlComponents.pathname.substring(
              0,
              urlComponents.pathname.length - 1
            )
          : urlComponents.pathname;
      const page = await AppDataSource.createQueryBuilder()
        .select("pages")
        .from(Page, "pages")
        .where("pages.url IN (:...url)", {
          url: [
            OriginalURL,
            urlComponents.pathname,
            `${urlComponents.pathname}/`,
          ],
        })
        .getOne();

      await cls.set("page", page);
    }
    next();
  }
}

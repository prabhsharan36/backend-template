import { Page } from "../entity/Page";
import cls from "../plugins/cls";
import { AppDataSource } from "../loaders/dataSource";

export default async function (req: any, _res: any, next: any) {
  const urlComponents = new URL(req.header("X-PUBLIC-URL"));
  if (urlComponents?.pathname.length > 0) {
    const OriginalURL = urlComponents.pathname;
    /**
     * Last character should not be equals to '/'
     */
    urlComponents.pathname =
      urlComponents.pathname.substring(urlComponents.pathname.length - 1) ===
      "/"
        ? urlComponents.pathname.substring(0, urlComponents.pathname.length - 1)
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

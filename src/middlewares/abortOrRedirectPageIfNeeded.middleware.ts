import { NotFound } from "../exceptions";
import cls from "../plugins/cls";
import errorHandler from "./errorHandler";

export default async function (_req: any, res: any, next: any) {
  const Page = cls.get("page");

  if (!Page?.is_active) {
    // when page is deactivated
    errorHandler(new NotFound(), res);
  }

  if (Page?.redirect_url && Page?.type === "old_page") {
    /**
     * changing the redirected_url string to URL object for getting
     * query(?) and pathname quicker rather than doing regex
     */
    const UrlComponents = new URL(
      "https://clinicspots.com" + Page.redirect_url
    );
    res.status(200).json({
      redirect: true,
      redirect_url_path: UrlComponents.pathname,
      redirect_url_query: UrlComponents.search,
      redirect_status_code: Page.redirect_status || 301,
    });
  }
  next();
}

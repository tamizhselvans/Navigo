import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|auth|_next/static|images|fonts|blogPosts|data|_next/image|robots.txt|sitemap.xml|manifest.json|favicon.ico).*)",
  ],
};

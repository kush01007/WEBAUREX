export const SITE_URL = "https://webaurex.in";
export const SITE_NAME = "Webaurex Studio";
export const SITE_ALTERNATE_NAME = "Webaurex";
export const HOME_TITLE = "Webaurex Studio | Web Development & Digital Experiences";
export const SITE_DESCRIPTION = "Webaurex Studio builds modern, responsive websites for businesses, e-commerce brands, and professionals, with a focus on clean design, performance, and real-world functionality.";
export const GOOGLE_SITE_VERIFICATION = "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

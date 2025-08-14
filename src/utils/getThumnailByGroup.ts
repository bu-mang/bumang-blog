import * as BlogItems from "@/assets/thumbnails/asBlogItem";
import * as PostBanners from "@/assets/thumbnails/compressed";

export function getThumbnailByGroup(
  group: string,
  as: "blogItem" | "postBanner" = "postBanner",
) {
  const groupLowercase = group.toLowerCase();

  switch (as) {
    case "blogItem":
      switch (groupLowercase) {
        case "project":
          return BlogItems.projects;
        case "frontend":
          return BlogItems.frontend;
        case "backend":
          return BlogItems.backend;
        case "computer science":
          return BlogItems.computerScience;
        case "interactive":
          return BlogItems.interactive;
        case "life":
          return BlogItems.life;
        default:
          return "";
      }

    case "postBanner":
      switch (groupLowercase) {
        case "project":
          return PostBanners.projects;
        case "frontend":
          return PostBanners.frontend;
        case "backend":
          return PostBanners.backend;
        case "computer science":
          return PostBanners.computerScience;
        case "interactive":
          return PostBanners.interactive;
        case "life":
          return PostBanners.life;
        default:
          return "";
      }
  }
}

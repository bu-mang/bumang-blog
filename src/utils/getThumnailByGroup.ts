export function getThumbnailByGroup(
  group: string,
  as: "blogItem" | "postBanner" = "postBanner",
) {
  const groupLowercase = group.toLowerCase();

  switch (as) {
    case "blogItem":
      switch (groupLowercase) {
        case "project":
          return "/thumbnails/asBlogItem/projects.webp";
        case "frontend":
          return "/thumbnails/asBlogItem/frontend.webp";
        case "backend":
          return "/thumbnails/asBlogItem/backend.webp";
        case "computer science":
          return "/thumbnails/asBlogItem/computerScience.webp";
        case "interactive":
          return "/thumbnails/asBlogItem/interactive.webp";
        case "life":
          return "/thumbnails/asBlogItem/life.webp";
        default:
          return "";
      }

    case "postBanner":
      switch (groupLowercase) {
        case "project":
          return "/thumbnails/compressed/projects.png";
        case "frontend":
          return "/thumbnails/compressed/frontend.png";
        case "backend":
          return "/thumbnails/compressed/backend.png";
        case "computer science":
          return "/thumbnails/compressed/computerScience.png";
        case "interactive":
          return "/thumbnails/compressed/interactive.png";
        case "life":
          return "/thumbnails/compressed/life.png";
        default:
          return "";
      }
  }
}

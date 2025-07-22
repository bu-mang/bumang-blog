export function getThumbnailByGroup(group: string) {
  const groupLowercase = group.toLowerCase();
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

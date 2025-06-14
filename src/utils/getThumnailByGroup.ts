export function getThumbnailByGroup(group: string) {
  const groupLowercase = group.toLowerCase();
  switch (groupLowercase) {
    case "project":
      return "/thumbnails/projects.png";
    case "frontend":
      return "/thumbnails/frontend.png";
    case "backend":
      return "/thumbnails/backend.png";
    case "computer science":
      return "/thumbnails/computerScience.png";
    case "interactive":
      return "/thumbnails/interactive.png";
    case "life":
      return "/thumbnails/life.png";
    default:
      return "";
  }
}

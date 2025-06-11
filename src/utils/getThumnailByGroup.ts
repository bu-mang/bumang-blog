export function getThumbnailByGroup(group: string) {
  const groupLowercase = group.toLowerCase();
  switch (groupLowercase) {
    case "projects":
      return "/thumbnails/projects.png";
    case "frontend":
      return "/thumbnails/frontend.png";
    case "backend":
      return "/thumbnails/backend.png";
    case "computerscience":
      return "/thumbnails/computerScience.png";
    case "interactive":
      return "/thumbnails/interactive.png";
    default:
    case "life":
      return "/thumbnails/life.png";
  }
}

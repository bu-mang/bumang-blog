import { CategoryNode } from "@/components/common/comboBox/type";

/**
 * @THIS_IS_BLOG_MENU_LISTS
 */

const LIFE_LIST: CategoryNode[] = [
  {
    value: "life",
    label: "Life",
    parent: null,
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "diary",
    label: "Diary",
    parent: "life",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "art",
    label: "Art",
    parent: "life",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "memo",
    label: "Memo",
    parent: "life",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
];

const PROJECTS_LIST: CategoryNode[] = [
  {
    value: "projects",
    label: "Projects",
    parent: null,
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "linkSnap",
    label: "Link Snap",
    parent: "projects",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "yinTarot",
    label: "Yin Tarot",
    parent: "projects",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "bumangRoute53",
    label: "Bumang Route53",
    parent: "projects",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "yanoljaProjects",
    label: "Yanolja Projects",
    parent: "projects",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "projectEtc",
    label: "Project etc",
    parent: "projects",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
];

const FRONTEND_LIST: CategoryNode[] = [
  {
    value: "frontend",
    label: "Frontend",
    parent: null,
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "htmlCss",
    label: "html & CSS",
    parent: "frontend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "jsTs",
    label: "JS/TS",
    parent: "frontend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "ReactNext",
    label: "React / Next.js",
    parent: "frontend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "reactNative",
    label: "React Native",
    parent: "frontend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "browserOptimization",
    label: "Browser Optimization",
    parent: "frontend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "frontendEtc",
    label: "Frontend etc",
    parent: "frontend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "errorHandling",
    label: "Error Handling",
    parent: "frontend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
];

const BACKEND_LIST: CategoryNode[] = [
  {
    value: "backend",
    label: "Backend",
    parent: null,
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "nodeJs",
    label: "Node.js",
    parent: "backend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "nestJs",
    label: "Nest.js",
    parent: "backend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "db",
    label: "DB",
    parent: "backend",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
];

const COMPUTER_SCIENCE_LIST: CategoryNode[] = [
  {
    value: "computerScience",
    label: "Computer Science",
    parent: null,
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "network",
    label: "Network",
    parent: "computerScience",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "designPattern",
    label: "Design Pattern",
    parent: "computerScience",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "os",
    label: "OS",
    parent: "computerScience",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
];

const ALGORITHM_LIST: CategoryNode[] = [
  {
    value: "algorithm",
    label: "Algorithm",
    parent: null,
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "problemSolving",
    label: "ProblemSolving",
    parent: "algorithm",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "dataStructure",
    label: "Data Structure",
    parent: "algorithm",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
];

const INTERACTIVES_LIST: CategoryNode[] = [
  {
    value: "interactives",
    label: "Interactives",
    parent: null,
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "canvasP5jsPixiJs",
    label: "canvas ・ P5.js ・ Pixi.js",
    parent: "interactives",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "threeJsUnityGame",
    label: "Three.js ・ Unity ・ Game",
    parent: "interactives",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
];

const NOTES_LIST: CategoryNode[] = [
  {
    value: "notes",
    label: "Notes",
    parent: null,
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "gitGithub",
    label: "Git ・ Github",
    parent: "notes",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "math",
    label: "Math",
    parent: "notes",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
  {
    value: "etc",
    label: "etc",
    parent: "notes",
    isVisible: true,
    permissions: ["public", "host", "member", "admin"],
  },
];

const CATEGORIES: CategoryNode[] = [
  ...LIFE_LIST,
  ...PROJECTS_LIST,
  ...FRONTEND_LIST,
  ...BACKEND_LIST,
  ...COMPUTER_SCIENCE_LIST,
  ...ALGORITHM_LIST,
  ...INTERACTIVES_LIST,
  ...NOTES_LIST,
];

export {
  LIFE_LIST,
  PROJECTS_LIST,
  FRONTEND_LIST,
  BACKEND_LIST,
  COMPUTER_SCIENCE_LIST,
  ALGORITHM_LIST,
  INTERACTIVES_LIST,
  NOTES_LIST,
  CATEGORIES,
};

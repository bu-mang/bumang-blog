import { CategoryNode } from "@/types";

/**
 * @THESE_ARE_BLOG_MENU_LISTS
 */

const LIFE_LIST: CategoryNode[] = [
  {
    id: Math.random().toString(),
    value: "life",
    label: "Life",
    parent: null,
    // isVisible: true, // 나중에 백엔드에서 isVisible: true인 것만 내려주기.
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "diary",
    label: "Diary",
    parent: "life",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "art",
    label: "Art",
    parent: "life",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "memo",
    label: "Memo",
    parent: "life",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
];

const PROJECTS_LIST: CategoryNode[] = [
  {
    id: Math.random().toString(),
    value: "projects",
    label: "Projects",
    parent: null,
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "linkSnap",
    label: "Link Snap",
    parent: "projects",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "yinTarot",
    label: "Yin Tarot",
    parent: "projects",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "bumangRoute53",
    label: "Bumang Route53",
    parent: "projects",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "yanoljaProjects",
    label: "Yanolja Projects",
    parent: "projects",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "projectEtc",
    label: "Project etc",
    parent: "projects",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
];

const FRONTEND_LIST: CategoryNode[] = [
  {
    id: Math.random().toString(),
    value: "frontend",
    label: "Frontend",
    parent: null,
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "htmlCss",
    label: "html & CSS",
    parent: "frontend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "jsTs",
    label: "JS/TS",
    parent: "frontend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "ReactNext",
    label: "React / Next.js",
    parent: "frontend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "reactNative",
    label: "React Native",
    parent: "frontend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "browserOptimization",
    label: "Browser Optimization",
    parent: "frontend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "frontendEtc",
    label: "Frontend etc",
    parent: "frontend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "errorHandling",
    label: "Error Handling",
    parent: "frontend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
];

const BACKEND_LIST: CategoryNode[] = [
  {
    id: Math.random().toString(),
    value: "backend",
    label: "Backend",
    parent: null,
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "nodeJs",
    label: "Node.js",
    parent: "backend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "nestJs",
    label: "Nest.js",
    parent: "backend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "db",
    label: "DB",
    parent: "backend",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
];

const COMPUTER_SCIENCE_LIST: CategoryNode[] = [
  {
    id: Math.random().toString(),
    value: "computerScience",
    label: "Computer Science",
    parent: null,
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "network",
    label: "Network",
    parent: "computerScience",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "designPattern",
    label: "Design Pattern",
    parent: "computerScience",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "os",
    label: "OS",
    parent: "computerScience",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
];

const ALGORITHM_LIST: CategoryNode[] = [
  {
    id: Math.random().toString(),
    value: "algorithm",
    label: "Algorithm",
    parent: null,
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "problemSolving",
    label: "ProblemSolving",
    parent: "algorithm",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "dataStructure",
    label: "Data Structure",
    parent: "algorithm",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
];

const INTERACTIVES_LIST: CategoryNode[] = [
  {
    id: Math.random().toString(),
    value: "interactives",
    label: "Interactives",
    parent: null,
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "canvasP5jsPixiJs",
    label: "canvas ・ P5.js ・ Pixi.js",
    parent: "interactives",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "threeJsUnityGame",
    label: "Three.js ・ Unity ・ Game",
    parent: "interactives",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
];

const NOTES_LIST: CategoryNode[] = [
  {
    id: Math.random().toString(),
    value: "notes",
    label: "Notes",
    parent: null,
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "gitGithub",
    label: "Git ・ Github",
    parent: "notes",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "math",
    label: "Math",
    parent: "notes",
    // isVisible: true,
    permissions: [null, "user", "admin"],
  },
  {
    id: Math.random().toString(),
    value: "etc",
    label: "etc",
    parent: "notes",
    // isVisible: true,
    permissions: [null, "user", "admin"],
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

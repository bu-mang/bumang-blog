import { PlayItemListType } from "@/types/playItem";

const playItems: PlayItemListType = [
  {
    id: 6,
    title: "Star",

    isCentered: true,
    content: "Digital Drawing, Clip Studio",
    imageOnly: false,
    thumnail: {
      width: 736,
      height: 736,
      imgUrl: "/star.webp",
    },
    items: [
      {
        width: 736,
        height: 736,
        imgUrl: "/star.webp",
      },
    ],
    isVisible: true,
    createdAt: "2025-07-07T14:48:00.000Z",
  },
  {
    id: 5,
    title: "250707 Drawings",

    content: "Digital Drawing, Clip Studio",
    imageOnly: false,
    thumnail: {
      width: 754,
      height: 754,
      imgUrl: "/play/5/thumbnail.png",
    },
    items: [
      {
        width: 931,
        height: 752,
        imgUrl: "/play/5/1.jpg",
      },
      {
        width: 931,
        height: 754,
        imgUrl: "/play/5/2.jpg",
      },
      {
        width: 931,
        height: 752,
        imgUrl: "/play/5/3.jpg",
      },
      {
        width: 931,
        height: 752,
        imgUrl: "/play/5/4.jpg",
      },
      {
        width: 1155,
        height: 753,
        imgUrl: "/play/5/5.jpg",
      },
      {
        width: 1155,
        height: 753,
        imgUrl: "/play/5/6.jpg",
      },
      {
        width: 2221,
        height: 754,
        imgUrl: "/play/5/7.jpg",
      },
    ],
    isVisible: true,
    createdAt: "2025-07-07T14:48:00.000Z",
  },
  null,
  {
    id: 4,
    title: "Pendulum in Pendulum",

    content: "Procreate, AfterEffect",
    imageOnly: false,
    thumnail: {
      width: 1820,
      height: 1024,
      imgUrl: "/play/4/3.gif",
    },
    items: [
      {
        width: 1820,
        height: 1024,
        imgUrl: "/play/4/1.gif",
      },
      {
        width: 1820,
        height: 1024,
        imgUrl: "/play/4/2.gif",
      },
      {
        width: 1820,
        height: 1024,
        imgUrl: "/play/4/3.gif",
      },
    ],
    isVisible: true,
    createdAt: "2025-07-07T14:48:00.000Z",
  },
  null,
  {
    id: 3,
    title: "Sketch",

    isCentered: true,
    content: "Procreate",
    imageOnly: false,
    thumnail: {
      width: 2732,
      height: 2048,
      imgUrl: "/play/3/1.JPEG",
    },
    items: [
      {
        width: 2732,
        height: 2048,
        imgUrl: "/play/3/1.JPEG",
      },
    ],
    isVisible: true,
    createdAt: "2025-07-07T14:48:00.000Z",
  },
  // {
  //   id: 3,
  //   title: "Sketch",

  //   isCentered: true,
  //   content: "Clip Studio",
  //   imageOnly: false,
  //   thumnail: {
  //     width: 800,
  //     height: 1066,
  //     imgUrl: "/play/3/1.JPG",
  //   },
  //   items: [
  //     {
  //       width: 800,
  //       height: 1066,
  //       imgUrl: "/play/3/1.JPG",
  //     },
  //   ],
  //   isVisible: true,
  //   createdAt: "2019-07-07T14:48:00.000Z",
  // },
  {
    id: 2,
    title: "CardCaptor",

    isCentered: true,
    content: "Clip Studio",
    imageOnly: false,
    thumnail: {
      width: 300,
      height: 300,
      imgUrl: "/play/2/thumbnail.png",
    },
    items: [
      {
        width: 739,
        height: 768,
        imgUrl: "/play/2/1.JPG",
      },
    ],
    isVisible: true,
    createdAt: "2019-07-07T14:48:00.000Z",
  },
  null,
  {
    id: 1,
    title: "Drawing in Notebook",

    content: "Hand Drawn",
    imageOnly: false,
    thumnail: {
      width: 2430,
      height: 2430,
      imgUrl: "/play/1/2.png",
    },
    items: [
      {
        width: 2430,
        height: 2430,
        imgUrl: "/play/1/1.png",
      },
      {
        width: 2430,
        height: 2430,
        imgUrl: "/play/1/2.png",
      },
      {
        width: 2430,
        height: 2430,
        imgUrl: "/play/1/3.png",
      },
    ],
    isVisible: true,
    createdAt: "2025-07-07T14:48:00.000Z",
    maxWidth: "40%",
  },
];

export default playItems;

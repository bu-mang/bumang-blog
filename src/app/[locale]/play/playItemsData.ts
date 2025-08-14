import { PlayItemListType } from "@/types/playItem";
import * as PlayImages from "@/assets/play";

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
      imgUrl: PlayImages.Star,
    },
    items: [
      {
        width: 736,
        height: 736,
        imgUrl: PlayImages.Star,
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
      imgUrl: PlayImages.Play5_thumbnail,
    },
    items: [
      {
        width: 931,
        height: 752,
        imgUrl: PlayImages.Play5_1,
      },
      {
        width: 931,
        height: 754,
        imgUrl: PlayImages.Play5_2,
      },
      {
        width: 931,
        height: 752,
        imgUrl: PlayImages.Play5_3,
      },
      {
        width: 931,
        height: 752,
        imgUrl: PlayImages.Play5_4,
      },
      {
        width: 1155,
        height: 753,
        imgUrl: PlayImages.Play5_5,
      },
      {
        width: 1155,
        height: 753,
        imgUrl: PlayImages.Play5_6,
      },
      {
        width: 2221,
        height: 754,
        imgUrl: PlayImages.Play5_7,
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
      imgUrl: PlayImages.Play4_3,
    },
    items: [
      {
        width: 1820,
        height: 1024,
        imgUrl: PlayImages.Play4_1,
      },
      {
        width: 1820,
        height: 1024,
        imgUrl: PlayImages.Play4_2,
      },
      {
        width: 1820,
        height: 1024,
        imgUrl: PlayImages.Play4_3,
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
      imgUrl: PlayImages.Play3_1,
    },
    items: [
      {
        width: 2732,
        height: 2048,
        imgUrl: PlayImages.Play3_1,
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
      imgUrl: PlayImages.Play2_thumbnail,
    },
    items: [
      {
        width: 739,
        height: 768,
        imgUrl: PlayImages.Play2_1,
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
      imgUrl: PlayImages.Play1_2,
    },
    items: [
      {
        width: 2430,
        height: 2430,
        imgUrl: PlayImages.Play1_1,
      },
      {
        width: 2430,
        height: 2430,
        imgUrl: PlayImages.Play1_2,
      },
      {
        width: 2430,
        height: 2430,
        imgUrl: PlayImages.Play1_3,
      },
    ],
    isVisible: true,
    createdAt: "2025-07-07T14:48:00.000Z",
    maxWidth: "40%",
  },
];

export default playItems;

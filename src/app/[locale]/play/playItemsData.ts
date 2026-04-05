import { PlayItemType } from "@/types/playItem";
import * as PlayImages from "@/assets/play";

const playItems: PlayItemType[] = [
  {
    id: 7,
    title: "250816",
    isCentered: false,
    content: "Digital Drawing, Clip Studio",
    imageOnly: false,
    position: { x: 400, y: 500, width: 300, height: 300 },
    thumnail: {
      width: 736,
      height: 736,
      imgUrl: PlayImages.Play6_1,
    },
    items: [
      {
        width: 1403.5,
        height: 907,
        imgUrl: PlayImages.Play6_2,
      },
      {
        width: 1403.5,
        height: 907,
        imgUrl: PlayImages.Play6_3,
      },
    ],
    isVisible: true,
    createdAt: "2025-08-18T14:48:00.000Z",
  },
  // {
  //   id: 6,
  //   title: "Star",

  //   isCentered: true,
  //   content: "Digital Drawing, Clip Studio",
  //   imageOnly: false,
  //   thumnail: {
  //     width: 736,
  //     height: 736,
  //     imgUrl: PlayImages.Star,
  //   },
  //   items: [
  //     {
  //       width: 736,
  //       height: 736,
  //       imgUrl: PlayImages.Star,
  //     },
  //   ],
  //   isVisible: true,
  //   createdAt: "2025-07-07T14:48:00.000Z",
  // },
  {
    id: 5,
    title: "250707 Drawings",
    content: "Digital Drawing, Clip Studio",
    imageOnly: false,
    position: { x: 900, y: 1200, width: 350, height: 350 },
    thumnail: {
      width: 754,
      height: 754,
      imgUrl: PlayImages.Play5_5,
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
  {
    id: 4,
    title: "Pendulum in Pendulum",
    content: "Procreate, AfterEffect",
    imageOnly: false,
    position: { x: 1600, y: 700, width: 450, height: 253 },
    thumnail: {
      width: 1820,
      height: 1024,
      imgUrl: PlayImages.Play4_3,
      placeholder: false,
    },
    items: [
      {
        width: 1820,
        height: 1024,
        imgUrl: PlayImages.Play4_1,
        placeholder: false,
      },
      {
        width: 1820,
        height: 1024,
        imgUrl: PlayImages.Play4_2,
        placeholder: false,
      },
      {
        width: 1820,
        height: 1024,
        imgUrl: PlayImages.Play4_3,
        placeholder: false,
      },
    ],
    isVisible: true,
    createdAt: "2025-07-07T14:48:00.000Z",
  },
  {
    id: 3,
    title: "Sketch",
    isCentered: true,
    content: "Procreate",
    imageOnly: false,
    position: { x: 2300, y: 1300, width: 400, height: 300 },
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

  {
    id: 2,
    title: "CardCaptor",
    isCentered: true,
    content: "Clip Studio",
    imageOnly: false,
    position: { x: 2900, y: 550, width: 280, height: 280 },
    thumnail: {
      width: 300,
      height: 300,
      imgUrl: PlayImages.Play2_thumbnail,
      unoptimized: true,
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
  {
    id: 1,
    title: "Drawing in Notebook",
    content: "Hand Drawn",
    imageOnly: false,
    position: { x: 3500, y: 1000, width: 320, height: 320 },
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

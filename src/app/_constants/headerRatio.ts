interface LayoutType {
  width: number;
  height: number;
}

const CONTAINER: LayoutType = {
  width: 1728,
  height: 166,
};

const SUB_CONTAINER: LayoutType = {
  width: 818,
  height: 166,
};

const HEIGHT_BASIS = 140;
const LETTERS: Record<string, LayoutType> = {
  B: {
    width: 111,
    height: HEIGHT_BASIS,
  },
  U1: {
    width: 129,
    height: HEIGHT_BASIS,
  },
  M: {
    width: 152,
    height: HEIGHT_BASIS,
  },
  A: {
    width: 142,
    height: HEIGHT_BASIS,
  },
  N: {
    width: 131,
    height: HEIGHT_BASIS,
  },
  G: {
    width: 136,
    height: HEIGHT_BASIS,
  },
  R: {
    width: 105,
    height: HEIGHT_BASIS,
  },
  O: {
    width: 154,
    height: HEIGHT_BASIS,
  },
  U2: {
    width: 121,
    height: HEIGHT_BASIS,
  },
  T: {
    width: 119,
    height: HEIGHT_BASIS,
  },
  E: {
    width: 97,
    height: HEIGHT_BASIS,
  },
  FIVE: {
    width: 105,
    height: HEIGHT_BASIS,
  },
  THREE: {
    width: 103,
    height: HEIGHT_BASIS,
  },
};

export { CONTAINER, SUB_CONTAINER, HEIGHT_BASIS, LETTERS };

// null만 가능
export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// null | undefined 모두 가능
export type Nullishable<T> = Partial<Nullable<T>>;

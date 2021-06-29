export type DefaultFilter<T> = {
  filter?: T;
  skip?: number;
  take?: number;
  sort?: {
    predicate: string;
    reverse: boolean;
  };
};

export type PagedDto<T> = {
  size: number;
  status: string;
  data: T[];
};

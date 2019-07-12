export interface IItem {
  id: string;
  value: number;
  type: string;
  title: string;
}

export interface IQuery {
  include: string[];
  exclude: string[];
  sortBy: string[];
}

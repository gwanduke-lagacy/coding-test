export interface IItem {
  id: string;
  value: number;
  type: string;
  title: string;
  team: string;
}

export interface IQuery {
  include: string[];
  exclude: string[];
  sortBy: string[];
}

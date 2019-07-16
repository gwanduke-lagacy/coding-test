import { IItem, IQuery } from "./type";

export const items: IItem[] = [
  {
    id: "1",
    title: "javascript",
    type: "lang",
    value: 2,
    team: "blue"
  },
  {
    id: "2",
    title: "typescript",
    type: "lib",
    value: 5,
    team: "blue"
  },
  {
    id: "3",
    title: "jest",
    type: "lib",
    value: 1,
    team: "blue"
  },
  {
    id: "4",
    title: "reactJS",
    type: "lib",
    value: 3,
    team: "red"
  },

  {
    id: "5",
    title: "browser",
    type: "env",
    value: 99,
    team: "blue"
  },
  {
    id: "6",
    title: "browser",
    type: "app",
    value: 55,
    team: "blue"
  }
];

export const queries: IQuery[] = [
  {
    include: ["type:lib", "team:blue"],
    exclude: ["id:1"],
    sortBy: ["value:asc"]
  },
  {
    include: ["title:browser"],
    exclude: [],
    sortBy: ["id:desc"]
  }
];

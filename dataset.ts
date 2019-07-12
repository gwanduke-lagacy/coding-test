import { IItem, IQuery } from "./type";

export const items: IItem[] = [
  {
    id: "1",
    title: "javascript",
    type: "lang",
    value: 2
  },
  {
    id: "2",
    title: "typescript",
    type: "lang",
    value: 5
  },
  {
    id: "3",
    title: "jest",
    type: "lib",
    value: 1
  },
  {
    id: "4",
    title: "reactJS",
    type: "lib",
    value: 3
  },
  {
    id: "5",
    title: "browser",
    type: "env",
    value: 99
  },
  {
    id: "6",
    title: "browser",
    type: "app",
    value: 55
  }
];

export const queries: IQuery[] = [
  {
    include: ["type:lib", "type:lang"],
    exclude: ["id:1"],
    sortBy: ["value:asc"]
  },
  {
    include: ["title:browser"],
    exclude: [],
    sortBy: ["id:desc"]
  }
];

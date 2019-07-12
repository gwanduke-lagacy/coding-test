import { IItem, IQuery } from "./type";

function clone(obj: object) {
  if (obj === null || typeof obj !== "object") return obj;

  var copy = obj.constructor();

  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      // @ts-ignore
      copy[attr] = obj[attr];
    }
  }

  return copy;
}

export const getResult = (items: IItem[], query: IQuery): IItem[] => {
  let filteredItems: IItem[] = clone(items);

  query.include.forEach(includeCond => {
    const [key, value] = includeCond.split(":");

    filteredItems = filteredItems.filter(item => {
      return item[key as keyof (IItem)].toString() === value;
    });
  });

  // TODO: exclude 기능

  // TODO: sort 기능

  return filteredItems;
};

export const getResultList = (items: IItem[], queries: IQuery[]): IItem[][] => {
  let resultList: IItem[][] = [];

  queries.forEach(query => {
    resultList.push(getResult(items, query));
  });

  return resultList;
};

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

const condToMap = (cond: string): { key: string; value: string | number } => {
  const [key, value] = cond.split(":");

  return {
    key,
    value
  };
};

const applyFilter = (
  items: IItem[],
  type: "include" | "exclude",
  conds: string[]
): IItem[] => {
  conds.forEach(cond => {
    const { key, value } = condToMap(cond);

    items = items.filter(item => {
      if (type === "include") {
        return item[key as keyof (IItem)].toString() === value;
      } else {
        // type === 'exclude'
        return item[key as keyof (IItem)].toString() !== value;
      }
    });
  });

  return items;
};

export const getResult = (items: IItem[], query: IQuery): IItem[] => {
  let filteredItems: IItem[] = clone(items);
  filteredItems = applyFilter(filteredItems, "include", query.include);
  filteredItems = applyFilter(filteredItems, "exclude", query.exclude);

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

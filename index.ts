import { IItem, IQuery } from "./type";

/**
 * key와 value를 분리하여 구조화해 반환한다.
 * @param cond key:value 형태의 조건 문자열
 */
const condToMap = (
  cond: string
): { key: keyof (IItem); value: string | number } => {
  const [key, value] = cond.split(":");

  return {
    key: key as keyof (IItem),
    value
  };
};

/**
 * type과 conds에 따라서 items를 필터링해 반환한다.
 * @param items 필터가 적용될 아이템 배열
 * @param type include | exclude
 * @param conds key:value 형태의 조건 문자열
 */
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

/**
 * 주어진 아이템을 조건에 맞춰 정렬한다.
 * @param items 정렬될 아이템 배열
 * @param conds 정렬 조건 ['field:asc', 'field:desc'] 형식
 */
export const applySort = (items: IItem[], conds: string[]): IItem[] => {
  const { key, value } = condToMap(conds[0]);

  return items.sort((a, b) => {
    if (a[key] === b[key]) {
      return 0;
    }

    if (value === "asc") {
      return a[key] < b[key] ? -1 : 1;
    } else {
      // value === "desc"
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

/**
 * items를 조건에따라 처리하여 변환된 배열 하나를 반환한다.
 * @param items 필터가 적용될 아이템 배열
 * @param query 조건을 정의하는 객체 (IQuery)
 */
export const getResult = (items: IItem[], query: IQuery): IItem[] => {
  items = applyFilter(items, "include", query.include);
  items = applyFilter(items, "exclude", query.exclude);

  // TODO: sort 기능

  return items;
};

/**
 * items를 조건에따라 처리하여 변환된 배열을 조건의 개수만큼 처리하여 반환한다.
 * @param items 필터가 적용될 아이템 배열
 * @param query 조건을 정의하는 객체들 (IQuery[])
 */
export const getResultList = (items: IItem[], queries: IQuery[]): IItem[][] => {
  let resultList: IItem[][] = [];

  queries.forEach(query => {
    resultList.push(getResult(items, query));
  });

  return resultList;
};

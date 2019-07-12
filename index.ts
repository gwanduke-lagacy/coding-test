import { IItem, IQuery } from "./type";

/**
 * key와 value를 분리하여 구조화해 반환한다.
 * @param cond key:value 형태의 조건 문자열
 */
const condToMap = (cond: string): { key: string; value: string | number } => {
  const [key, value] = cond.split(":");

  return {
    key,
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

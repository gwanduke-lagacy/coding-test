import { IItem, IQuery } from "./type";

/**
 * key와 value를 분리하여 구조화해 반환한다.
 * @param cond key:value 형태의 조건 문자열
 */
const condToMap = (
  cond: string
): { field: keyof (IItem); order: string | number } => {
  const [field, order] = cond.split(":");

  return {
    field: field as keyof (IItem),
    order
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
    const { field, order } = condToMap(cond);

    items = items.filter(item => {
      if (type === "include") {
        return item[field as keyof (IItem)].toString() === order;
      } else {
        // type === 'exclude'
        return item[field as keyof (IItem)].toString() !== order;
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
  const conditions = conds.map(cond => {
    const { field, order } = condToMap(cond);

    return {
      field,
      order
    };
  });

  return items.sort((a, b) => {
    let sortResult = 0;

    conditions.forEach(cond => {
      const valueA = a[cond.field];
      const valueB = b[cond.field];

      if (valueA === valueB) {
        sortResult = sortResult || 0;
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        if (cond.order === "asc") {
          sortResult = sortResult || valueA - valueB;
        } else {
          // cond.order === 'desc'
          sortResult = sortResult || valueB - valueA;
        }
      } else {
        // 숫자 외의 경우에는 string으로 변환하여 처리
        if (cond.order === "asc") {
          sortResult =
            sortResult || valueA.toString().localeCompare(valueB.toString());
        } else {
          // cond.order === 'desc'
          sortResult =
            sortResult || valueB.toString().localeCompare(valueA.toString());
        }
      }
    });

    return sortResult;
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
  items = applySort(items, query.sortBy);

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

import { getResultList, getResult } from "./index";
import { IQuery, IItem } from "./type";

const items: IItem[] = [
  {
    id: "1",
    title: "javascript",
    type: "lang",
    value: 1
  },
  {
    id: "2",
    title: "typescript",
    type: "lang",
    value: 1
  }
];

describe("#getResult", () => {
  describe("if include condition is given", () => {
    const query: IQuery = {
      include: ["id:1"],
      exclude: [],
      sortBy: []
    };

    it("result has only matched items, id === 1", () => {
      const result = getResult(items, query);
      result.forEach(item => {
        expect(item.id).toBe("1");
      });
    });

    it("has only one item", () => {
      const result = getResult(items, query);
      expect(result.length).toBe(1);
    });
  });
});

describe("#getResultList", () => {
  const sampleQuery = {
    include: [],
    exclude: [],
    sortBy: []
  };

  let queries: IQuery[];

  describe("if many queries are given", () => {
    queries = [sampleQuery, sampleQuery, sampleQuery];
    it("results.length must equal queries.length", () => {
      expect(getResultList(items, queries).length).toBe(queries.length);
    });
  });
});
import { getResultList, getResult, applySort } from "./index";
import { IQuery, IItem } from "./type";

const items: IItem[] = [
  {
    id: "1",
    title: "javascript",
    type: "lang",
    value: 1,
    team: "blue"
  },
  {
    id: "2",
    title: "typescript",
    type: "lang",
    value: 10,
    team: "blue"
  },
  {
    id: "55",
    title: "chrome",
    type: "browser",
    value: 5,
    team: "blue"
  },
  {
    id: "3",
    title: "firefox",
    type: "browser",
    value: 99,
    team: "blue"
  }
];

describe("#applySort", () => {
  it("does not change length of items", () => {
    const result = applySort(items, ["value:asc"]);
    expect(result.length).toBe(items.length);
  });

  describe("if condition is type:asc, value:desc", () => {
    const sortConds = ["type:asc", "value:desc"];

    it("items should sort by type asc, value desc", () => {
      const result = applySort(items, sortConds);
      for (let i = 0; i < items.length - 1; i++) {
        expect(result[i].type <= result[i + 1].type).toBeTruthy();
        expect(result[0].value > result[1].value).toBeTruthy();
        expect(result[2].value > result[3].value).toBeTruthy();
      }
    });
  });

  describe("if condition is type:desc, value:desc", () => {
    const sortConds = ["type:desc", "value:desc"];

    it("items should sort by type desc, value desc", () => {
      const result = applySort(items, sortConds);
      for (let i = 0; i < items.length - 1; i++) {
        expect(result[i].type >= result[i + 1].type).toBeTruthy();
        expect(result[0].value > result[1].value).toBeTruthy();
        expect(result[2].value > result[3].value).toBeTruthy();
      }
    });
  });

  describe("if condition is value:asc (number)", () => {
    const sortConds = ["value:asc"];

    it("items should sort by value asc", () => {
      const result = applySort(items, sortConds);
      for (let i = 0; i < items.length - 1; i++) {
        expect(result[i].value < result[i + 1].value).toBeTruthy();
      }
    });
  });

  describe("if condition is value:desc (number)", () => {
    const sortConds = ["value:desc"];

    it("items should sort by value desc", () => {
      const result = applySort(items, sortConds);
      for (let i = 0; i < items.length - 1; i++) {
        expect(result[i].value > result[i + 1].value).toBeTruthy();
      }
    });
  });
});

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

  describe("if include condition is given as number", () => {
    const query: IQuery = {
      include: ["value:10"],
      exclude: [],
      sortBy: []
    };

    it("result has only matched items, value === 10", () => {
      const result = getResult(items, query);
      result.forEach(item => {
        expect(item.value).toBe(10);
      });
    });

    it("has only one item", () => {
      const result = getResult(items, query);
      expect(result.length).toBe(1);
    });
  });

  describe("if multiple conditions are given", () => {
    const query: IQuery = {
      include: ["id:1"],
      exclude: ["title:javascript"],
      sortBy: []
    };

    it("has no items", () => {
      const result = getResult(items, query);
      expect(result.length).toBe(0);
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

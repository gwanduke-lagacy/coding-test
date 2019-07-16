import { items, queries } from "./dataset";
import { getResultList } from ".";

describe("integration test", () => {
  it("should return correct result", () => {
    const result = getResultList(items, queries);

    expect(result.length).toBe(queries.length);

    // 개발자가 조건에 대한 결과를 알고있음. dataset.ts 참고
    expect(result[0].length).toBe(2);
    expect(result[0][0].value).toBe(1);
    expect(result[0][1].value).toBe(5);

    expect(result[1].length).toBe(2);
    expect(result[1][0].id).toBe("6");
    expect(result[1][1].id).toBe("5");
  });
});

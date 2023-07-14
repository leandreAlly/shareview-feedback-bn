import { expect, test, describe } from "@jest/globals";
import { sum } from ".";

describe("Index", () => {
  test("it shoulf return 10", () => {
    const result = sum(5, 5);

    expect(result).toBe(10);
  });
});

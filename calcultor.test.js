const { add } = require('./calculator');

describe("String Calculator", () => {
    test("returns 0 for empty string", () => {
        expect(add("")).toBe(0);
    });

    test("returns the number for a single number input", () => {
        expect(add("1")).toBe(1);
        expect(add("42")).toBe(42);
    });

    test("returns sum of two comma-separated numbers", () => {
        expect(add("1,2")).toBe(3);
    });

    test("returns sum for multiple comma-separated numbers", () => {
        expect(add("1,2,3,4")).toBe(10);
    });

    test("supports newline as delimiter", () => {
        expect(add("1\n2,3")).toBe(6);
    });

    test("supports custom single-character delimiter", () => {
        expect(add("//;\n1;2")).toBe(3);
        expect(add("//*\n2*3*4")).toBe(9);
    });

    test("supports custom multi-character delimiters", () => {
        expect(add("//[***]\n1***2***3")).toBe(6);
    });

    test("ignores numbers greater than 1000", () => {
        expect(add("2,1001")).toBe(2);
        expect(add("1000,1")).toBe(1001);
    });

    test("throws error on single negative number", () => {
        expect(() => add("1,-2,3")).toThrow("negative numbers not allowed -2");
    });

    test("throws error on multiple negative numbers", () => {
        expect(() => add("-1,-5,2")).toThrow("negative numbers not allowed -1,-5");
    });


});

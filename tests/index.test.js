const supertest = require("supertest");
const app = require("../app.js");
const request = supertest(app);

describe("1st test", () => {
    test("Welcome test", () => {
        const str = "hello world";
        expect(str).toBe("hello world");
    });
});

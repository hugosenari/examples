const request = require("supertest");
const { getServerlessApiGatewayUrl } = require("./test-helper");

describe("handler", () => {
  let baseUrl;
  beforeAll(async () => {
    baseUrl = process.env.IS_OFFLINE
      ? "http://localhost:3000"
      : await getServerlessApiGatewayUrl(
          "dev",
          "laconia-examples-serverless-vanilla"
        );
  });

  afterAll(() => {
    console.info(`baseUrl: ${baseUrl}`);
  });

  ["uppercase", "comparison/uppercase"].forEach(endpoint => {
    describe(`/${endpoint}`, () => {
      it("should capitalize the `value` query param", async () => {
        const response = await request(baseUrl)
          .get(`/${endpoint}?value=hello`)
          .expect("Content-Type", /json/)
          .expect(200);
        expect(response.body.value).toEqual("HELLO");
      });

      it("should return 400 on ValidationError", async () => {
        const response = await request(baseUrl)
          .get(`/${endpoint}`)
          .expect("Content-Type", /text/)
          .expect(400);
        expect(response.text).toBe("?value= is missing or empty.");
      });

      it("should return 503 on FiveOhThreeError using path param", async () => {
        const response = await request(baseUrl)
          .get(`/${endpoint}/503error`)
          .expect("Content-Type", /text/)
          .expect(503);
        expect(response.text).toBe("Unsupported.");
        expect(response.headers["x-error-class"]).toBe("FiveOhThreeError");
      });
    });
  });
});

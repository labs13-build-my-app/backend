const { server } = require("../api/server");
const request = require("supertest");

describe("GET /", () => {
  //   it("testing env var", () => {
  //     expected(process.env.CLIENT_ID).toBe(
  //       "177270465698-tbnm6os1224qjrkdrhvkrnqrhgftfu96.apps.googleusercontent.com"
  //     );
  //   });

  it("returns 200 OK", () => {
    return request(server)
      .get("/")
      .expect(200);
  });
});

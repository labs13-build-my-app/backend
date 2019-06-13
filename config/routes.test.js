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

  it("testing endpoin in users", () => {
    return request(server)
      .get("/api/users/test-users")
      .expect("testing users route, looks like it works");
  });

  it("get all users", () => {
    return request(server)
      .get("/api/users/list-all-users")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("get all developers", () => {
    return request(server)
      .get("/api/users/developers")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

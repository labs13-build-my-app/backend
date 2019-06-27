const { server } = require("../api/server");
const request = require("supertest");

describe("GET /", () => {
  it("returns 200 OK", () => {
    return request(server)
      .get("/")
      .expect(200);
  });

  it("user profile endpoint", async () => {
    const res = await request(server).get("/api/users/profile/1");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  it("get all developers", async () => {
    const res = await request(server).get("/api/users/list-developers");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  it("get projects in proposal status", async () => {
    const res = await request(server).get(
      "/api/projects/paginated-list-of-projects"
    );
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  it("create a project", () => {
    let project = {
      name: "Howell - Wunsch",
      description:
        "Nihil quos illum voluptatem. Nam velit nihil aliquam consequatur nihil. Distinctio maiores quidem quo. Aut quaerat et unde et aut qui et.",
      image_url: "http://lorempixel.com/640/480",
      budget: 83955,
      dueDate: 1562991852088.0,
      projectStatus: "proposal",
      paymentStatus: "unpaid",
      user_id: 35,
      userRole: "Project Developer"
    };

    let globalToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UZEROakEzUkRSRlFUSkRRamxDUTBaRE1rVkdSakJETlRsR00wVTVSRVF5TlRJMU1EY3pNQSJ9.eyJnaXZlbl9uYW1lIjoiRGVubmlzIiwiZmFtaWx5X25hbWUiOiJPcmJpc29uIiwibmlja25hbWUiOiJvcmJpc29uLmRlbm5pcyIsIm5hbWUiOiJEZW5uaXMgT3JiaXNvbiIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLVJhTFlNajJfUWdnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmNVZ1ZMUDZZS0E4bEhseS16NlZMUTlYOGlrY3cvcGhvdG8uanBnIiwibG9jYWxlIjoiZW4iLCJ1cGRhdGVkX2F0IjoiMjAxOS0wNi0yNlQxNDozNjozMy41MjdaIiwiaXNzIjoiaHR0cHM6Ly9kZXYtanV5NGdxeWouYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEwNjUyMzUxNjMyODkzMDYyMDUzIiwiYXVkIjoiZXJrQUFBYXI0UnJFcXg0R2NNU2VmaEw0MnMyZnVsU3UiLCJpYXQiOjE1NjE1NTk3OTMsImV4cCI6MTU2MTU5NTc5MywiYXV0aF90aW1lIjoxNTYxNTU5NzkzLCJhdF9oYXNoIjoid0pqdUVxQUYyd1AtenNNbUJCNzFLUSIsIm5vbmNlIjoidEozd3AtckswbllBZjZHSGg1ZDFYYVpHOGZOZTlOem8ifQ.dfWNdiv4suUTlHoweZXofJu7llxRmSt0PGbOUbjsvDqYZDjWR1vjdAkt_dCJRvPciQl6KzkhXJYqVH1o2mQowipy3mmRXyXM08ZbEm8yBCskIzHV6vRxt2c7SesiFi6aAVglobPkg4Foyau5SRNg_I9nO3_B87LiQNubdsoE7-BjdniPwb4LEfpSxcje9lm6uF8nE_CPcN2018x5ydgRIYICX6mJMiw-0ETSBKLUrh2OW5L5SHLoeIzduXsBjHXB7zkb-K6Gl77IR_M_ihbrT7GrUzGsYUC3B_x6w7TcN67ck3A3mTy05ski6f4lNZq2d2zSG5KuRgKnKZnm8fIeQQ";
    return request(server)
      .post("/api/account/project-owner/create-project")
      .set("Authorization", globalToken)
      .send(project)
      .then(res => {
        expect(res.status).toBe(201);
        expect(typeof res).toBe("object");
        expect(res.type).toBe("application/json");
        expect(res.body.name).toBe("Howell - Wunsch");
      });
  });
});

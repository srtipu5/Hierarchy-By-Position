import request from "supertest";
import app from "../../Provider/HttpServer";
import DatabaseClient from "../../Provider/DatabaseClient";

describe("End-to-End Tests: API", () => {
  let token: string;
  beforeAll(async () => {
    await DatabaseClient.connect();
    
    const authResponse = await request(app)
      .post("/api/auth")
      .send({ username: "testUsername", password: "testPassword" });
    token = authResponse.body.token;
  });

  it("GET /api/employee should return an array of hierarchical employees", async () => {
    const response = await request(app).get("/api/employee?id=1");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /api/auth should return a token with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth")
      .send({ username: "testUsername", password: "testPassword" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("GET /api/auth-employee should return an array of hierarchical employees", async () => {
    const response = await request(app)
      .get("/api/auth-employee?id=1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  afterAll(() => {
    DatabaseClient.close();
  });
});

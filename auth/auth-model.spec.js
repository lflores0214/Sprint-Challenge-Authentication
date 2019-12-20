const Auth = require("./auth-model");
const db = require("../database/dbConfig");
const server = require("../api/server");
const request = require("supertest");

describe("Auth Model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  // Register endpoint tests
  describe("/api/auth/register", function() {
    it("should add users to the DB", async function() {
      await Auth.add({ username: "Ben", password: "pass" });
      await Auth.add({ username: "Luke", password: "pass" });

      const users = await db("users");
      expect(users).toHaveLength(2);
    });

    it("should return status 201", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Leia", password: "pass" })
        .then(response => {
          expect(response.status).toBe(201);
        });
    });
  });
  // login endpoint tests
  describe("/api/auth//login", function() {
    it("should return status 200", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Ben", password: "pass" })
        .then(response => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Ben", password: "pass" })
            .then(response => {
              expect(response.status).toBe(200);
            });
        });
    });
    it("should return a token", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "Ben", password: "pass" })
        .then(response => {
          expect(response.body.token);
        });
    });
  });

  //jokes endpoint tests
  describe("/api/jokes", function() {
    it("should return status 200", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Ben", password: "pass" })
        .then(response => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Ben", password: "pass" })
            .then(response => {
              const token = response.body.token;
              return request(server)
                .get("/api/jokes")
                .set("authorization", token)
                .then(response => {
                  expect(response.status).toBe(200);
                });
            });
        });
    });

    it("should return jokes", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Ben", password: "pass" })
        .then(response => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Ben", password: "pass" })
            .then(response => {
              const token = response.body.token;
              return request(server)
                .get("/api/jokes")
                .set("authorization", token)
                .then(response => {
                  expect(response.body.jokes);
                });
            });
        });
    });
  });
});

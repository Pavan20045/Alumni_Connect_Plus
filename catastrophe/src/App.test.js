const request = require("supertest");
const app = require("../app"); // your Express app

describe("API Automated Tests", () => {

  test("GET /items - should return all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /items - should create an item", async () => {
    const newItem = { name: "Test Item", price: 100 };

    const res = await request(app)
      .post("/items")
      .send(newItem);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Item");
  });

  test("GET /items/:id - should return one item", async () => {
    const res = await request(app).get("/items/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  test("DELETE /items/:id - should delete an item", async () => {
    const res = await request(app).delete("/items/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Item deleted");
  });

  test("POST /items - validation error", async () => {
    const res = await request(app).post("/items").send({});

    expect(res.statusCode).toBe(400);
  });

});

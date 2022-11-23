const supertest = require("supertest");
const Review = require("../models/reviewModel");
const app = require("../app");
const database = require("../database");

const request = supertest(app);

const dummyReview = new Review({
    student: "637bad0732e98737689bbb4a",
    teacher: "637e4c29591f64dbeb58652a",
    rating: "8",
    content: "Good teacher"
});

let testId = null;

describe("Reviews endpoint", () => {
  beforeAll(async () => {
    await database.connect();
    const response = await dummyReview.save();
    testId = response._id.toHexString();
  });

  afterAll(() => {
    database.disconnect();
  });

  test("Post a new review", async () => {
    const testReview = {
        student: "637bad0732e98737689bbb4a",
        teacher: "637e4c29591f64dbeb58652a",
        rating: "8",
        content: "Good teacher"
    };
    return await request
      .post("/reviews/api")
      .send(testReview)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
            user: expect.any(String),
            teacher: expect.any(String),
            rating: expect.any(String),
            content: expect.any(String),
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(String),
            })
          })
        );
      });
  });

  test('GET reviews for one teacher', async () => {
    const testTeacherId = '637e4c29591f64dbeb58652a'
    return await request
      .get(`/reviews/api/${testTeacherId}`)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
                expect.objectContaining({
              __v: expect.any(Number),
              _id: expect.any(String),
              student: expect.any(Object),
              teacher: expect.any(Object),
              rating: expect.any(String),
              content: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
                
            })
        ])
          })
        )
      })
  })
  test("GET a 404 error if student not found", async () => {
    const notFoundId = "6320d412764e84089ed2789e";
    return await request
      .get(`/reviews/api/${notFoundId}`)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(404);
  })

  test("DELETE a student", async () => {
    return await request
      .delete(`/reviews/${testId}`)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              deletedCount: expect.any(Number),
              acknowledged: expect.any(Boolean)
            }),
          })
        );
      });
  });

});

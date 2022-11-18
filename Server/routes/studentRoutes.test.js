const supertest = require("supertest");
const Student = require("../models/studentModel");
const app = require("../app");
const database = require("../database");

const request = supertest(app);

const dummyStudent = new Student({
  firstName: "Dummy",
  lastName: "Student",
  email: "dummy@student.com",
  password: "Dummystudent9?",
});

let testId = null;

describe("Student endpoint", () => {
  beforeAll(async () => {
    await database.connect();
    const response = await dummyStudent.save();
    testId = response._id.toHexString();
  });

  afterAll(() => {
    database.disconnect();
  });

  test("Login test", async () => {
    const testStudent = {
      email: "dummy@student.com",
      password: "Dummystudent9?",
    };
    return await request
      .post("/students/login")
      .send(testStudent)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
            email: expect.any(String),
            token: expect.any(String)
          })
        );
      });
  });
  test("Signup test", async () => {
    const testStudent = {
      firstName: "testName",
      lastName: "testLastName",
      email: "tesmail@test.com",
      password: "Tarallo08?",
    };
    return await request
      .post("/students/signup")
      .send(testStudent)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              __v: expect.any(Number),
              _id: expect.any(String),
              firstName: expect.any(String),
              lastName: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
            success: expect.any(Boolean),
          })
        );
      });
  });
  test('GET a student by ID', async () => {
    return await request
      .get(`/students/api/${testId}`)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              __v: expect.any(Number),
              _id: expect.any(String),
              firstName: expect.any(String),
              lastName: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            })
          })
        )
      })
  })
  test("GET a 404 error if student not found", async () => {
    const notFoundId = "6320d412764e84089ed2789e";
    return await request
      .get(`/students/api/${notFoundId}`)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(404);
  })

  test("PATCH to update a student", async () => {
    const testStudent = {
      firstName: "testName",
      lastName: "testLastName",
      email: "testmail@test.com",
    };
    return await request
      .patch(`/students/${testId}`)
      .send(testStudent)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              modifiedCount: expect.any(Number),
            }),
            success: expect.any(Boolean),
          })
        );
      });
  });
  test("DELETE a student", async () => {
    return await request
      .delete(`/students/${testId}`)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              deletedCount: expect.any(Number),
            }),
            success: expect.any(Boolean),
          })
        );
      });
  });

});

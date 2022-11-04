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

  test("Signup test", async () => {
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
            __v: expect.any(Number),
            _id: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          })
        );
      });
  });
  test("Login test", async () => {
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
});

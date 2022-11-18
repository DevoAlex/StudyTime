const supertest = require("supertest");
const Teacher = require('../models/teacherModel')
const app = require("../app");
const database = require("../database");

const request = supertest(app);

const dummyTeacher = new Teacher({
  firstName: "Dummy",
  lastName: "Teacher",
  email: "dummy@teacher.com",
  password: "Dummyteacher9?",
  subjects: ['grammar'],
  availableDays: ['monday'],
  pricePerHour: '6',
  availableFor: ['study help'],
  introduction: 'Hi test teacher here!',
  gender: 'not set',
  city: 'Milan'
});

let testId = null;

describe("Student endpoint", () => {
  beforeAll(async () => {
    await database.connect();
    const response = await dummyTeacher.save();
    testId = response._id.toHexString();
  });

  afterAll(() => {
    database.disconnect();
  });

  test("Login test", async () => {
    const testTeacher = {
      email: "dummy@teacher.com",
      password: "Dummyteacher9?",
    };
    return await request
      .post("/teachers/login")
      .send(testTeacher)
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
    const testTeacher = {
      "firstName":"Donald",
      "lastName":"Trump",
      "email":"donaldtrump6@gmail.com",
      "password":"Donato9=",
      "subjects":["mathematics","history"],
      "availableDays": ["monday"],
      "pricePerHour":"4",
      "city":"Milan",
      "gender":"not set",
      "introduction":"Hola",
      "availableFor":["study help"]
    };
    return await request
      .post("/teachers/signup")
      .send(testTeacher)
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
              subjects: expect.any(Array),
              availableDays: expect.any(Array),
              pricePerHour: expect.any(String),
              availableFor: expect.any(Array),
              introduction: expect.any(String),
              gender: expect.any(String),
              city: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
            success: expect.any(Boolean),
          })
        );
      });
  });
  test("GET all teachers", async () => {
    return await request
      .get("/teachers/api")
      .expect("content-type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              expect.objectContaining({
                __v: expect.any(Number),
              _id: expect.any(String),
              firstName: expect.any(String),
              lastName: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
              subjects: expect.any(Array),
              availableDays: expect.any(Array),
              pricePerHour: expect.any(String),
              availableFor: expect.any(Array),
              introduction: expect.any(String),
              gender: expect.any(String),
              city: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              }),
            ]),
            success: expect.any(Boolean),
          })
        );
      });
  });
  test('GET a teacher by ID', async () => {
    return await request
      .get(`/teachers/api/${testId}`)
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
                subjects: expect.any(Array),
                availableDays: expect.any(Array),
                pricePerHour: expect.any(String),
                availableFor: expect.any(Array),
                introduction: expect.any(String),
                gender: expect.any(String),
                city: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
          })
        )
      })
  })
  test("GET a 404 error if teacher not found", async () => {
    const notFoundId = "6320d412764e84089ed2789e";
    return await request
      .get(`/students/api/${notFoundId}`)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(404);
  })

  test("PATCH to update a teacher", async () => {
    const testTeacher = {
      firstName: "testName",
      lastName: "testLastName",
      email: "tesmail@test.com",
    };
    return await request
      .patch(`/teachers/${testId}`)
      .send(testTeacher)
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
  test("DELETE a teacher", async () => {
    return await request
      .delete(`/teachers/${testId}`)
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

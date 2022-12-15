import routes from "../../routes/routes";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../database/index";
import mongoose from "mongoose";
import app from "../../app";
import CustomError from "../../customError/customError";
import Project from "../../../database/models/project/project";

let server: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

beforeEach(async () => {
  await Project.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET '/projects/loadAllProjects' endpoint", () => {
  describe("When it receives a request with an empty body", () => {
    test("Then it should return an object with a property 'projects'", async () => {
      const status = 200;

      const response = await request(app)
        .get(`${routes.projectsRouter}${routes.loadProjects}`)
        .expect(status);

      expect(response.body).toHaveProperty("projects");
    });
  });

  describe("When it receives a request with an empty body and there are no projects", () => {
    test("Then it should return an empty object", async () => {
      const status = 204;

      Project.find = jest.fn().mockReturnValue(null);

      const response = await request(app)
        .get(`${routes.projectsRouter}${routes.loadProjects}`)
        .expect(status);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request with an empty body and an error happens", () => {
    test("Then it should return an object with a property 'error'", async () => {
      const status = 500;
      const customError = new CustomError(
        "Error loading the projects!",
        500,
        "Error loading the projects!"
      );

      Project.find = jest.fn().mockRejectedValue(customError);

      const response = await request(app)
        .get(`${routes.projectsRouter}${routes.loadProjects}`)
        .expect(status);

      expect(response.body).toStrictEqual({
        error: "Error loading the projects!",
      });
    });
  });
});

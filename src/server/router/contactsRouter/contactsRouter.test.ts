import routes from "../../routes/routes";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../database/index";
import mongoose from "mongoose";
import app from "../../app";
import CustomError from "../../customError/customError";
import Contact from "../../../database/models/contact/contact";
import {
  contactMock,
  contactNoEmailMock,
  contactNoMessageMock,
  contactNoNameMock,
} from "../../../mocks/contacts/contactMock";

let server: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

beforeEach(async () => {
  await Contact.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a POST '/projects/add' endpoint", () => {
  describe("When it receives a request with a valid contact", () => {
    test("Then it should return an object with a property name, email, telephone and message", async () => {
      const status = 201;
      Contact.create = jest.fn().mockReturnValue(contactMock);

      const response = await request(app)
        .post(`${routes.contactsRouter}${routes.addContact}`)
        .send(contactMock)
        .expect(status);

      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("telephone");
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("When it receives a request with a contact without a name", () => {
    test("Then it should return an object with a property error", async () => {
      const status = 204;

      const response = await request(app)
        .post(`${routes.contactsRouter}${routes.addContact}`)
        .send(contactNoNameMock)
        .expect(status);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request with a contact without a email", () => {
    test("Then it should return an object with a property error", async () => {
      const status = 204;

      const response = await request(app)
        .post(`${routes.contactsRouter}${routes.addContact}`)
        .send(contactNoEmailMock)
        .expect(status);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request with a contact without a message", () => {
    test("Then it should return an object with a property error", async () => {
      const status = 204;

      const response = await request(app)
        .post(`${routes.contactsRouter}${routes.addContact}`)
        .send(contactNoMessageMock)
        .expect(status);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request and an internal server error happnes", () => {
    test("Then it should return an object with a property error", async () => {
      const status = 500;
      const customError = new CustomError(
        "Error creating the contact",
        500,
        "Error creating the contact"
      );
      Contact.create = jest.fn().mockRejectedValue(customError);

      const response = await request(app)
        .post(`${routes.contactsRouter}${routes.addContact}`)
        .send(contactMock)
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });
});

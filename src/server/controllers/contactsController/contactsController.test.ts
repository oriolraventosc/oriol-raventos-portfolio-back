import { addContact } from "./contactsController";
import type { Response, Request, NextFunction } from "express";
import { contactMock } from "../../../mocks/contacts/contactMock";
import Contact from "../../../database/models/contact/contact";
import CustomError from "../../customError/customError";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a contactsController", () => {
  describe("When it is invoked with the method addContact", () => {
    test("Then it should return a 201 status", async () => {
      const status = 201;
      const req: Partial<Request> = {
        body: contactMock,
      };

      Contact.create = jest.fn().mockReturnValue(contactMock);
      await addContact(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
  describe("When it is invoked with the method addContact but there is no name", () => {
    test("Then it should it's next method with a customError", async () => {
      const customError = new CustomError(
        "Missing information",
        204,
        "Missing information"
      );
      const req: Partial<Request> = {
        body: {
          name: "",
          email: "john@gmail.com",
          telephone: 934774190,
          message:
            "I'm interested in contracting your services to develop my business web page",
        },
      };

      Contact.create = jest.fn().mockRejectedValue(customError);
      await addContact(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it is invoked with the method addContact but there is no email", () => {
    test("Then it should call it's next method with a customError", async () => {
      const customError = new CustomError(
        "Missing information",
        204,
        "Missing information"
      );
      const req: Partial<Request> = {
        body: {
          name: "John",
          email: "",
          telephone: 934774190,
          message:
            "I'm interested in contracting your services to develop my business web page",
        },
      };

      Contact.create = jest.fn().mockRejectedValue(customError);
      await addContact(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it is invoked with the method addContact but there is no message", () => {
    test("Then it should call it's next method with a customError", async () => {
      const customError = new CustomError(
        "Missing information",
        204,
        "Missing information"
      );
      const req: Partial<Request> = {
        body: {
          name: "John",
          email: "john@gmail.com",
          telephone: 934774190,
          message: "",
        },
      };

      Contact.create = jest.fn().mockRejectedValue(customError);
      await addContact(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it is invoked with the method addContact and an internal server error happens", () => {
    test("Then it should it's next method with a customError", async () => {
      const customError = new CustomError(
        "Error creating the contact",
        500,
        "Error creating the contact"
      );
      const req: Partial<Request> = {
        body: contactMock,
      };

      Contact.create = jest.fn().mockRejectedValue(customError);
      await addContact(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

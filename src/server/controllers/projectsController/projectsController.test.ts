import type { Request, Response, NextFunction } from "express";
import Project from "../../../database/models/project/project";
import { projectMock } from "../../../mocks/projects/projectMock";
import CustomError from "../../customError/customError";
import { loadAllProjects } from "./projectsController";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a projectsController", () => {
  describe("When it is invoked with the method loadAllProjects", () => {
    test("Then it should return a 200 status", async () => {
      const status = 200;
      const req: Partial<Request> = {};

      Project.find = jest.fn().mockReturnValue(projectMock);
      await loadAllProjects(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When it is invoked with the method loadAllProjects and there are no projects", () => {
    test("Then it should call it's next method with a customError", async () => {
      const customError = new CustomError(
        "There are no projects!",
        204,
        "There are no projects!"
      );
      const req: Partial<Request> = {};

      Project.find = jest.fn().mockReturnValue(null);
      await loadAllProjects(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it is invoked with the method loadAllProjects and an error happens", () => {
    test("Then it should call it's next with a customError", async () => {
      const customError = new CustomError(
        "Error loading the projects!",
        500,
        "Error loading the projects!"
      );
      const req: Partial<Request> = {};

      Project.find = jest.fn().mockRejectedValue(customError);
      await loadAllProjects(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

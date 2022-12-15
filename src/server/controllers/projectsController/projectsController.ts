import type { Request, Response, NextFunction } from "express";
import debugCreator from "debug";
import Project from "../../../database/models/project/project.js";
import CustomError from "../../customError/customError.js";
import enviroment from "../../../loadEnviroment.js";
import chalk from "chalk";

const debug = debugCreator(`${enviroment.debug}controller-projects`);

export const loadAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await Project.find();

    if (!projects) {
      const customError = new CustomError(
        "There are no projects!",
        204,
        "There are no projects"
      );
      next(customError);
      return;
    }

    res.status(200).json({ projects });
    debug(chalk.green(`${projects.length} projects found!`));
  } catch {
    const customError = new CustomError(
      "Error loading the projects!",
      500,
      "Error loading the projects!"
    );
    next(customError);
  }
};

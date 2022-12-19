import type { Request, Response, NextFunction } from "express";
import Contact from "../../../database/models/contact/contact.js";
import type { ContactData } from "../../../types/types.js";
import CustomError from "../../customError/customError.js";
import debugCreator from "debug";
import enviroment from "../../../loadEnviroment.js";
import chalk from "chalk";

const debug = debugCreator(`${enviroment.debug}controller-contacts`);

export const addContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactInformation = req.body as ContactData;
  try {
    const { name, email, message } = contactInformation;
    if (!name || !email || !message) {
      const customError = new CustomError(
        "Missing information",
        204,
        "Missing information"
      );
      next(customError);
      return;
    }

    const contact = await Contact.create(contactInformation);

    res.status(201).json(contact);
    debug(chalk.green(`${name} created!`));
  } catch {
    const customError = new CustomError(
      "Error creating the contact",
      500,
      "Error creating the contact"
    );
    next(customError);
  }
};

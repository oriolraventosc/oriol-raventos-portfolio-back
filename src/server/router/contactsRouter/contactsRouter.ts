import express from "express";
import { addContact } from "../../controllers/contactsController/contactsController.js";
import routes from "../../routes/routes.js";
import { validate } from "express-validation";
import contactSchema from "../../schemas/contactSchema.js";

// eslint-disable-next-line new-cap
const contactsRouter = express.Router();

contactsRouter.post(
  routes.addContact,
  validate(contactSchema, {}, { abortEarly: false }),
  addContact
);

export default contactsRouter;

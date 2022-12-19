import morgan from "morgan";
import express from "express";
import cors from "cors";
import { generalError, endpointUnknown } from "./middlewares/error.js";
import routes from "./routes/routes.js";
import projectsRouter from "./router/projectsRouter/projectsRouter.js";
import contactsRouter from "./router/contactsRouter/contactsRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(routes.projectsRouter, cors(), projectsRouter);

app.use(routes.contactsRouter, cors(), contactsRouter);

app.use(endpointUnknown);

app.use(generalError);

export default app;

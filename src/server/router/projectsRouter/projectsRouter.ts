import routes from "../../routes/routes.js";
import express from "express";
import { loadAllProjects } from "../../controllers/projectsController/projectsController.js";

// eslint-disable-next-line new-cap
const projectsRouter = express.Router();

projectsRouter.get(routes.loadProjects, loadAllProjects);

export default projectsRouter;

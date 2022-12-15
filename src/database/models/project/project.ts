import { model, Schema } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    requird: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Project = model("Project", projectSchema, "projects");

export default Project;

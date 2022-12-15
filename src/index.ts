import enviroment from "./loadEnviroment";
import connectToDataBase from "./database";

const { mongoDbUrl } = enviroment;

await connectToDataBase(mongoDbUrl);

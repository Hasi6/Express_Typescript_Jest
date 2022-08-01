import "express-async-errors";
import "dotenv/config";
import express, { Application, json } from "express";
import cors from "cors";
import registerRoutes from "./routes";
import { NotFoundError } from "./utils/execptions";
import { errorHandler } from "./middlewares/error-handler";

const app: Application = express();

const PORT: string = process.env.PORT || "5000";

app.use(json());
app.use(cors());
registerRoutes(app);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started at PORT: ${PORT}`);
});

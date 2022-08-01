import "express-async-errors";
import "dotenv/config";
import express, { Application, json } from "express";
import cors from "cors";
import registerRoutes from "./routes";

const app: Application = express();

const PORT: string = process.env.PORT || "5000";

app.use(json());
app.use(cors());
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`server started at PORT: ${PORT}`);
});

import express from "express";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger";
import router from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

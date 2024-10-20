import express from "express";
import router from "./routes";
import options from "./swagger";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(router);

const swaggerSpec = swaggerJSDoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

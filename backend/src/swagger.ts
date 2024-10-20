const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Test Case Express API",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js", "./routes/*.ts"],
};

export default options;

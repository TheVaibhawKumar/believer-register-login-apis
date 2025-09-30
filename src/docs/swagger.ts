import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Believer Auth APIs",
      version: "1.0.0",
      description: "Register & Login APIs",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: [path.join(__dirname, "..", "routes", "*.ts")],
};

const spec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec));
};

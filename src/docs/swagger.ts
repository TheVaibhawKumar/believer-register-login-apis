import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { Express } from 'express';

export const setupSwagger = (app: Express) => {
  const file = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');
  const swaggerDocument = yaml.parse(file);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
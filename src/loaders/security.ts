import helmet from 'helmet';
import cors from 'cors';
import { Express } from 'express';

export const applySecurity = (app: Express) => {
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
};

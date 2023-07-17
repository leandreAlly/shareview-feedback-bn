import express from 'express';
import welcomeRoutes from './api/welcome.routes';

const routes = express.Router();

routes.use('/', welcomeRoutes);

export default routes;

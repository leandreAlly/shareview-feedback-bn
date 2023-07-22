import express from 'express';
import welcomeRoutes from './api/welcome.routes';
import userRoutes from './api/user.routes';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', userRoutes);

export default routes;

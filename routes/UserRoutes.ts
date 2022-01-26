import { Router } from "express";
import * as userController from '../controllers/UserController';

const routes = Router();

routes.get('/users', userController.getUser);
routes.get('/users/:key', userController.getUserByKey);
routes.post('/users', userController.postUser);
routes.put('/users/:key', userController.putUser);
routes.delete('/users/:key', userController.deleteUser);

export default routes;
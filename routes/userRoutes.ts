import { Router } from "express";
import { GetSingleUser, GetUsers, UpdateSingleUser } from "../controllers/userController";

const UserRoutes = Router();

UserRoutes.get('/', GetUsers);
UserRoutes.get('/:id', GetSingleUser);
UserRoutes.patch('/:id', UpdateSingleUser);

export default UserRoutes;
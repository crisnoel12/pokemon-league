import { Router } from "express";
import { SignupPostController, LoginPostController, LogoutController, IsLoggedInController } from "../controllers/authControllers";

const AuthRoutes = Router();

AuthRoutes.post('/signup', SignupPostController);
AuthRoutes.post('/login', LoginPostController);
AuthRoutes.get('/logout', LogoutController);
AuthRoutes.get('/is-logged-in', IsLoggedInController);

export default AuthRoutes;
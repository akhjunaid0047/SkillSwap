import { Router } from "express";
import signUpUser, { getUser } from "../controllers/user.controller";
const userRouter = Router();

userRouter.post('/signup',signUpUser);
userRouter.get('/get-user', getUser);
export default userRouter;
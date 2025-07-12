import { Router } from "express";
import signUpUser, { getUser } from "../controllers/user.controller";
import { authoriseToken, verifyUser } from "../middleware/auth.middleware";
const userRouter = Router();

userRouter.post('/signup',signUpUser);
userRouter.get('/get-user', getUser);
export default userRouter;
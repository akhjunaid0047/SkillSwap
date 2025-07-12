import { Router } from "express";
import userRouter from "./user.route";
import swapRouter from "./swap.route";

const appRouter = Router();
appRouter.use('/user',userRouter);
appRouter.use('/swap',swapRouter)

export default appRouter;
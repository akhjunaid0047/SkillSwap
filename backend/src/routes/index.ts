import { Router } from "express";
import userRouter from "./user.route";
import swapRouter from "./swap.route";
import adminRouter from "./admin.route";

const appRouter = Router();
appRouter.use('/user',userRouter);
appRouter.use('/swap',swapRouter)
appRouter.use('/admin',adminRouter);

export default appRouter;
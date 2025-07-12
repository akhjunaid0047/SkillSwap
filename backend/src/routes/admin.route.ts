import { Router } from "express";
import { signUpAdmin } from "../controllers/admin.controller";

const adminRouter = Router();

adminRouter.post('/signup',signUpAdmin);
// adminRouter.get('/get-user', getUser);
export default adminRouter;
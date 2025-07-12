import { Router } from "express";
import { createSwap, getSwaps } from "../controllers/swap.controller";
import { authoriseToken, verifyUser } from "../middleware/auth.middleware";

const swapRouter = Router();

swapRouter.post('/create-swap',authoriseToken,verifyUser,createSwap);
swapRouter.get('/:userId',authoriseToken,verifyUser, getSwaps);
export default swapRouter;
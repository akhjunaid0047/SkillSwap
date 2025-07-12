import { Router } from "express";
import { createSwap, getSwaps } from "../controllers/swap.controller";

const swapRouter = Router();

swapRouter.post('/create-swap',createSwap);
swapRouter.get('/:userId', getSwaps);
export default swapRouter;
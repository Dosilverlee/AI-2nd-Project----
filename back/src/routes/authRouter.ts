import { Router } from "express";
import { localAuthentication } from "../middlewares/authenticateLocal";

const authRouter = Router();

authRouter.post("/login", localAuthentication);

export default authRouter;

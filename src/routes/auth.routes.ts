import { Router, Request, Response, NextFunction } from "express";

import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    authController.login(req, res, next);
});

export default router;

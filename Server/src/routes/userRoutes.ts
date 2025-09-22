import { Router } from "express";
import * as userController from "../controller/userController.js";

const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

export default router;

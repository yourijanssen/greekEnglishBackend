// src/routes/userRoutes.ts
import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.get("/users", UserController.getAll);
router.get("/", UserController.test);
router.post("/users/seed", UserController.seed); // <--- Add this line

export default router;

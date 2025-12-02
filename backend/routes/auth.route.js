import { login } from "../controllers/Auth/ProfessorAuth.js";
import { userLogin } from "../controllers/Auth/UserAuth.js";
import express from "express";
const router = express.Router();

router.post("/login", login);
router.post("/user-login", userLogin);

export default router;
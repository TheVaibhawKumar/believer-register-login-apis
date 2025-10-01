import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

/**
 * POST /api/auth/register
 * body: { name, email, phone?, password }
 */
router.post(
  "/register",
  [
    body("name").isString().trim().isLength({ min: 2 }),
    body("email").isEmail().normalizeEmail(),
    body("phone").optional().isLength({ min: 10, max: 10 }),
    body("password").isLength({ min: 6 }), // instead of 8
  ],
  validateRequest,
  register
);

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").exists()],
  validateRequest,
  login
);

export default router;

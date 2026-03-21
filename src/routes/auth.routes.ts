import { login, logout } from "@/controllers/auth.controller";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Router } from "express";

const router = Router()
  .post("/auth/login", login)
  .get("/auth/logout", [isAuthenticated], logout)

export { router as authRoutes };

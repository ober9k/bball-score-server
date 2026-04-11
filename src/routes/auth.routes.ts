import { login, logout, me } from "@/controllers/auth.controller";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Router } from "express";

const router = Router()
  .post("/auth/login", login)
  .get("/auth/logout", [isAuthenticated], logout)
  .get("/auth/me", [isAuthenticated], me)

export { router as authRoutes };

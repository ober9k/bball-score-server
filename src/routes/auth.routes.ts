import { login, logout, me } from "@/controllers/auth.controller";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Router } from "express";

const router = Router()
  .post("/login", login)
  .get("/logout", [isAuthenticated], logout)
  .get("/me", [isAuthenticated], me)

export { router as authRoutes };

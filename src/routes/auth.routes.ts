import { login, logout } from "@/controllers/auth.controller";
import { Router } from "express";

const router = Router()
  .get("/auth/login", login)
  .post("/auth/login", login)
  .get("/auth/logout", logout)
  .post("/auth/logout", logout)

export { router as authRoutes };

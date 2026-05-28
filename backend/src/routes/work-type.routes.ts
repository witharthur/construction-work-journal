import { Router } from "express";
import { listWorkTypes } from "../controllers/work-type.controller.js";

export const workTypeRoutes = Router();

workTypeRoutes.get("/", listWorkTypes);

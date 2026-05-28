import { Router } from "express";
import { entryRoutes } from "./entry.routes.js";
import { workTypeRoutes } from "./work-type.routes.js";

export const apiRoutes = Router();

apiRoutes.use("/entries", entryRoutes);
apiRoutes.use("/work-types", workTypeRoutes);

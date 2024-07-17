import { Router } from "express";
import { HardwareCategoryController } from "../controllers/HardwareCategoryController";

const router = Router();
const hardwareCategoryController = new HardwareCategoryController();

router.post("/categories", (req, res) =>
  hardwareCategoryController.createCategory(req, res)
);
router.put("/categories/:id", (req, res) =>
  hardwareCategoryController.updateCategory(req, res)
);
router.delete("/categories/:id", (req, res) =>
  hardwareCategoryController.deleteCategory(req, res)
);
router.get("/categories", (req, res) =>
  hardwareCategoryController.getAllCategories(req, res)
);
router.get("/categories/:id", (req, res) =>
  hardwareCategoryController.getCategoryById(req, res)
);

export default router;

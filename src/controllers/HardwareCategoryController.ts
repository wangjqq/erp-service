import { Request, Response } from "express";
import { HardwareCategoryService } from "../services/HardwareCategoryService";

export class HardwareCategoryController {
  private hardwareCategoryService = new HardwareCategoryService();

  async createCategory(req: Request, res: Response): Promise<void> {
    const { name, parentId } = req.body;

    try {
      const category = await this.hardwareCategoryService.createCategory(
        name,
        parentId
      );
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, parentId } = req.body;

    try {
      const category = await this.hardwareCategoryService.updateCategory(
        parseInt(id),
        name,
        parentId
      );
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this.hardwareCategoryService.deleteCategory(parseInt(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    const categories = await this.hardwareCategoryService.getAllCategories();
    res.json(categories);
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const category = await this.hardwareCategoryService.getCategoryById(
        parseInt(id)
      );
      res.json(category);
    } catch (error) {
      res.status(404).json({ message: "分类不存在" });
    }
  }
}

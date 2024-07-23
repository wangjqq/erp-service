import { Request, Response } from 'express'
import { ProductService } from '../services/ProductService'

export class ProductController {
  private productService = new ProductService()

  async createProduct(req: Request, res: Response): Promise<void> {
    const { description, quantity, average_cost_price, average_anticipated_price, hardwareCategoryId } = req.body

    try {
      const product = await this.productService.createProduct(
        description,
        quantity,
        average_cost_price,
        average_anticipated_price,
        hardwareCategoryId
      )
      res.status(201).json(product)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { description, quantity, average_cost_price, average_anticipated_price, hardwareCategoryId } = req.body

    try {
      const product = await this.productService.updateProduct(
        parseInt(id),
        description,
        quantity,
        average_cost_price,
        average_anticipated_price,
        hardwareCategoryId
      )
      res.json(product)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      await this.productService.deleteProduct(parseInt(id))
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    const products = await this.productService.getAllProducts()
    res.json({ data: products })
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const product = await this.productService.getProductById(parseInt(id))
      res.json(product)
    } catch (error) {
      res.status(404).json({ message: '产品不存在' })
    }
  }
}

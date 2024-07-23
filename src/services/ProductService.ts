import { Product } from '../entities/Product'
import { HardwareCategory } from '../entities/HardwareCategory'
import { AppDataSource } from '../data-source'

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product)
  private hardwareCategoryRepository = AppDataSource.getRepository(HardwareCategory)

  async createProduct(
    description: string,
    quantity: number,
    average_cost_price: number,
    average_anticipated_price: number,
    hardwareCategoryId: number
  ): Promise<Product> {
    const hardwareCategory = await this.hardwareCategoryRepository.findOne({ where: { id: hardwareCategoryId } })

    const product = this.productRepository.create({
      description,
      quantity,
      average_cost_price,
      average_anticipated_price,
      hardwareCategory,
    })

    return await this.productRepository.save(product)
  }
  async updateProduct(
    id: number,
    description?: string,
    quantity?: number,
    average_cost_price?: number,
    average_anticipated_price?: number,
    hardwareCategoryId?: number
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } })

    if (!product) {
      throw new Error('找不到指定的产品')
    }

    const hardwareCategory = hardwareCategoryId
      ? await this.hardwareCategoryRepository.findOne({ where: { id: hardwareCategoryId } })
      : product.hardwareCategory

    // 仅更新存在于请求中的字段
    product.description = description !== undefined ? description : product.description
    product.quantity = quantity !== undefined ? quantity : product.quantity
    product.average_cost_price = average_cost_price !== undefined ? average_cost_price : product.average_cost_price
    product.average_anticipated_price =
      average_anticipated_price !== undefined ? average_anticipated_price : product.average_anticipated_price
    product.hardwareCategory = hardwareCategory

    return await this.productRepository.save(product)
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } })
    if (!product) {
      throw new Error('找不到指定的产品')
    }
    await this.productRepository.remove(product)
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['hardwareCategory'] })
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['hardwareCategory'] })
    if (!product) {
      throw new Error('找不到指定的产品')
    }
    return product
  }
}

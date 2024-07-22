import { AppDataSource } from '../data-source'
import { HardwareCategory } from '../entities/HardwareCategory'
import { sortTreeById } from '../utils'

export class HardwareCategoryService {
  private readonly hardwareCategoryRepository = AppDataSource.getRepository(HardwareCategory)

  async createCategory(name: string, parentId?: number): Promise<HardwareCategory> {
    const newCategory = new HardwareCategory()
    newCategory.name = name

    if (parentId) {
      const parentCategory = await this.hardwareCategoryRepository.findOne({
        where: { id: parentId },
      })
      newCategory.parent = parentCategory
    }

    return await this.hardwareCategoryRepository.save(newCategory)
  }

  async updateCategory(categoryId: number, name: string, parentId?: number): Promise<HardwareCategory> {
    let category = await this.hardwareCategoryRepository.findOne({
      where: { id: categoryId },
    })

    if (!category) {
      throw new Error('找不到指定的分类')
    }

    category.name = name

    if (parentId) {
      const parentCategory = await this.hardwareCategoryRepository.findOne({
        where: { id: parentId },
      })
      category.parent = parentCategory
    } else {
      category.parent = null
    }

    return await this.hardwareCategoryRepository.save(category)
  }

  async deleteCategory(categoryId: number): Promise<HardwareCategory> {
    const category = await this.hardwareCategoryRepository.findOne({ where: { id: categoryId } })

    if (!category) {
      throw new Error('找不到指定的分类')
    }

    return await this.hardwareCategoryRepository.remove(category)
  }

  async getAllCategories(): Promise<HardwareCategory[]> {
    const treeCategories = await AppDataSource.manager.getTreeRepository(HardwareCategory).findTrees()
    return sortTreeById(treeCategories)
  }

  async getCategoryById(categoryId: number): Promise<HardwareCategory> {
    return await this.hardwareCategoryRepository.findOne({ where: { id: categoryId } })
  }
}

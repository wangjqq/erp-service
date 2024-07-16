import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { InventoryRecord } from "../entities/InventoryRecord";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

class InventoryService {
  private readonly productRepository = AppDataSource.getRepository(Product);
  private readonly inventoryRecordRepository =
    AppDataSource.getRepository(InventoryRecord);

  async addProduct(productDto: {}, user: User) {
    const product = this.productRepository.create(productDto);
    await this.productRepository.save(product);

    const inventoryRecord = this.inventoryRecordRepository.create({
      product,
      user,
      change: product.quantity,
      type: "in",
      remark: "Initial stock",
    });

    await this.inventoryRecordRepository.save(inventoryRecord);
    return product;
  }

  async updateStock(
    productId: number,
    change: number,
    user: User,
    type: string,
    remark: string
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new Error("Product not found");
    }

    product.quantity += change;
    await this.productRepository.save(product);

    const inventoryRecord = this.inventoryRecordRepository.create({
      product,
      user,
      change,
      type,
      remark,
    });

    await this.inventoryRecordRepository.save(inventoryRecord);
  }

  async revokeStockChange(recordId: number, user: User) {
    const record = await this.inventoryRecordRepository.findOne({
      where: { id: recordId },
      relations: ["product"],
    });
    if (!record) {
      throw new Error("Inventory record not found");
    }

    const product = record.product;
    product.quantity -= record.change;
    await this.productRepository.save(product);

    const revokeRecord = this.inventoryRecordRepository.create({
      product,
      user,
      change: -record.change,
      type: "revoke",
      remark: "Revoke: " + record.remark,
    });

    await this.inventoryRecordRepository.save(revokeRecord);
  }
}

export default new InventoryService();

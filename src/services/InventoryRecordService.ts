import { InventoryRecord } from '../entities/InventoryRecord'
import { AppDataSource } from '../data-source'

export class InventoryRecordService {
  private inventoryRecordRepository = AppDataSource.getRepository(InventoryRecord)

  async createInventoryRecord(data: Partial<InventoryRecord>): Promise<InventoryRecord> {
    const inventoryRecord = this.inventoryRecordRepository.create(data)
    return await this.inventoryRecordRepository.save(inventoryRecord)
  }

  async updateInventoryRecord(id: number, data: Partial<InventoryRecord>): Promise<InventoryRecord> {
    await this.inventoryRecordRepository.update(id, data)
    return await this.inventoryRecordRepository.findOne({ where: { id } })
  }

  async deleteInventoryRecord(id: number): Promise<void> {
    await this.inventoryRecordRepository.delete(id)
  }

  async getAllInventoryRecords(): Promise<InventoryRecord[]> {
    return await this.inventoryRecordRepository.find({ relations: ['product', 'user', 'source'] })
  }

  async getInventoryRecordById(id: number): Promise<InventoryRecord> {
    return await this.inventoryRecordRepository.findOne({ where: { id }, relations: ['product', 'user', 'source'] })
  }
}

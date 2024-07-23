import { Request, Response } from 'express'
import { InventoryRecordService } from '../services/InventoryRecordService'

const inventoryRecordService = new InventoryRecordService()

export class InventoryRecordController {
  async createInventoryRecord(req: Request, res: Response): Promise<void> {
    const data = req.body
    const inventoryRecord = await inventoryRecordService.createInventoryRecord(data)
    res.status(201).json(inventoryRecord)
  }

  async updateInventoryRecord(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)
    const data = req.body
    const inventoryRecord = await inventoryRecordService.updateInventoryRecord(id, data)
    res.status(200).json(inventoryRecord)
  }

  async deleteInventoryRecord(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)
    await inventoryRecordService.deleteInventoryRecord(id)
    res.status(204).send()
  }

  async getAllInventoryRecords(req: Request, res: Response): Promise<void> {
    const inventoryRecords = await inventoryRecordService.getAllInventoryRecords()
    res.status(200).json(inventoryRecords)
  }

  async getInventoryRecordById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)
    const inventoryRecord = await inventoryRecordService.getInventoryRecordById(id)
    res.status(200).json(inventoryRecord)
  }
}

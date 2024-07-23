import { Router } from 'express'
import { InventoryRecordController } from '../controllers/InventoryRecordController'

const router = Router()
const inventoryRecordController = new InventoryRecordController()

router.post('/inventoryRecords', inventoryRecordController.createInventoryRecord)
router.put('/inventoryRecords/:id', inventoryRecordController.updateInventoryRecord)
router.delete('/inventoryRecords/:id', inventoryRecordController.deleteInventoryRecord)
router.get('/inventoryRecords', inventoryRecordController.getAllInventoryRecords)
router.get('/inventoryRecords/:id', inventoryRecordController.getInventoryRecordById)

export default router

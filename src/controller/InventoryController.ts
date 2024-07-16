import { Router, Request, Response } from 'express';
import InventoryService from '../services/InventoryService';

const router = Router();

export const addProduct = async (req: Request, res: Response) => {

    const data = await InventoryService.addProduct(req.body,{} as any)
    res.json({ msg: '添加产品成功', data })
  }
  


export default router;

import { Request, Response } from 'express';
import { SourceService } from '../services/SourceService';

export class SourceController {
  private sourceService = new SourceService();

  async createSource(req: Request, res: Response): Promise<void> {
    const { name, address, phone, mainBusiness, priceAdvantage, types } = req.body;

    try {
      const source = await this.sourceService.createSource(name, address, phone, mainBusiness, priceAdvantage, types);
      res.status(201).json(source);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateSource(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, address, phone, mainBusiness, priceAdvantage, types } = req.body;

    try {
      const source = await this.sourceService.updateSource(parseInt(id), name, address, phone, mainBusiness, priceAdvantage, types);
      res.json(source);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteSource(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this.sourceService.deleteSource(parseInt(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllSources(req: Request, res: Response): Promise<void> {
    const sources = await this.sourceService.getAllSources();
    res.json(sources);
  }

  async getSourceById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const source = await this.sourceService.getSourceById(parseInt(id));
      res.json(source);
    } catch (error) {
      res.status(404).json({ message: '渠道不存在' });
    }
  }
}

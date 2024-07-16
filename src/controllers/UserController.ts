import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
  private userService = new UserService()

  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.register(req.body)
      res.json(user)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}

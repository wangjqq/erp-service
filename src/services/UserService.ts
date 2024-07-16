import { User } from '../entities/User'
import * as bcrypt from 'bcrypt'
import { AppDataSource } from '../data-source'

export class UserService {
  private readonly userRepository = AppDataSource.getRepository(User)

  async register({ username, password, email, phone }): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: [{ username }, { email }] })
    console.log(username, password, email, phone)
    if (existingUser) {
      throw new Error('用户名或邮箱已存在')
    }

    const password_hash = await bcrypt.hash(password, 10)

    const user = new User()
    user.username = username
    user.password_hash = password_hash
    user.email = email
    user.phone = phone

    return await this.userRepository.save(user)
  }
}

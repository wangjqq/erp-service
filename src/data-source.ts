import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'

const { host, user, port, password, database } = process.env as any
export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username: user,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: ['src/entity/*.ts'],
  migrations: [],
  subscribers: [],
})

import { AppDataSource } from './data-source'
import express from 'express'
import cors from 'cors'
import UserRouter from './routers/UserRouter'
import HardwareCategoryRouter from './routers/HardwareCategoryRouter'
import SourceRouter from './routers/SourceRouter'
import productRouter from './routers/productRouter'
import InventoryRecordRoutes from './routers/InventoryRecordRoutes'

function initializeAppDataSource() {
  return AppDataSource.initialize()
    .then(async () => {
      const app = express()
      app.use(cors())
      app.use(express.json())
      app.use(express.urlencoded({ extended: true })) // 解析表单数据

      app.use('/inventoryRecord', InventoryRecordRoutes)
      app.use('/user', UserRouter)
      app.use('/hardwareCategory', HardwareCategoryRouter)
      app.use('/source', SourceRouter)
      app.use('/product', productRouter)

      let server

      function startServer() {
        server = app.listen(3000, () => {
          console.log('Server is running on port 3000')
        })
      }

      function stopServer() {
        if (server) {
          server.close(() => {
            console.log('Server is stopped')
          })
        }
      }
      // 启动Express服务器
      startServer()
      // Handle uncaught exceptions
      process.on('uncaughtException', (err) => {
        stopServer()
        startServer()
      })
    })
    .catch((error) => {
      console.log(error)
      setTimeout(() => {
        initializeAppDataSource()
      }, 10000)
    })
}
initializeAppDataSource()

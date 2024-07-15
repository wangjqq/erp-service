import { AppDataSource } from './data-source'
import express, { Request, Response } from 'express'
import cors from 'cors'

function initializeAppDataSource() {
  return AppDataSource.initialize()
    .then(async () => {
      const app = express()
      app.use(cors())
      app.use(express.json())
      app.use(express.urlencoded({ extended: true })) // 解析表单数据

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

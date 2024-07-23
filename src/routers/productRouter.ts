import { Router } from 'express'
import { ProductController } from '../controllers/ProductController'

const router = Router()
const productController = new ProductController()

// 创建产品
router.post('/products', (req, res) => productController.createProduct(req, res))

// 更新产品
router.put('/products/:id', (req, res) => productController.updateProduct(req, res))

// 删除产品
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res))

// 获取所有产品
router.get('/products', (req, res) => productController.getAllProducts(req, res))

// 获取指定产品
router.get('/products/:id', (req, res) => productController.getProductById(req, res))

export default router

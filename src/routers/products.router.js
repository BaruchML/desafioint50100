import { Router } from 'express'
import { ProductController } from '../controllers/products.controller.js'

const router = Router()
const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct } = new ProductController()
router
    .get('/',getProducts)
    .get('/:pid',getProduct)
    .post('/',createProduct)
    .put('/:pid/:desc',updateProduct)
    .delete('/:pid',deleteProduct)


export default router
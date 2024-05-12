import {Router} from 'express'
import { CartController } from '../controllers/carts.controller.js'

const router = Router()
const { 
    getCarts,
    getCartById,
    createCart,
    createCartBody,
    addProductToCart,
    deleteProductFromCart,
    deleteCart} = new CartController()
router
    .get('/', getCarts)
    .get('/:cid',getCartById )
    .post('/',createCart)
    .post('/create',createCartBody)
    //meter 1 producto a un array de un carrito
    .put('/:cid/:pid',addProductToCart)
    .delete('/:cid/:pid',deleteProductFromCart)
    .delete('/:cid',deleteCart)

export default router
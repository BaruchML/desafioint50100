import fs from 'node:fs/promises'
import loggerWinston from '../../../utils/logger.js'
class CartManagerFS {
    constructor() {
        this.path = './src/jsonDB/Carts.json'
        this.pathCatalogo = './src/jsonDB/Products.json'
    }
    //definiendo metodos 

    //leyendo archivo
    async readFile() {
        try {
            const dataCarts = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(dataCarts)
        }
        catch (error) {
            return []
        }

    }
    async readFileC() {
        try {
            const dataCatalogo = await fs.readFile(this.pathCatalogo, 'utf-8')
            return JSON.parse(dataCatalogo)
        }
        catch (error) {
            return []
        }

    }



    async createCart() {
        try {
            const carts = await this.readFile()
            let newCart = {
                id: carts.length + 1,
                products: []
            }

            carts.push(newCart)
            //fs.write(cual ruta, que info, que formato)
            //JSON.stringify(valor,replacer,espacio)
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
            return newCart
        } catch (error) {

        }
    }
    async getCardById(cid) {
        try {
            const carts = await this.readFile()
            const cart = carts.find(c => c.id === cid)
            if (!cart) {
                return 'No se encuentra el carrito'
            }
            return cart
        } catch (error) {
            loggerWinston.error(error);
        }
    }
    async addProductToCart(cid, pid) {
        try {
            const carts = await this.readFile()
            const catalogo = await this.readFileC()
            
            const cart =  carts.find(c => c.id === cid)
            if (!cart) {
                return 'No se encuentra el carrito'
            }
            
            const productRead =  catalogo.find(p => p.id === pid)
            if (!productRead){
                return 'Ese producto no se encuentra en nuestro catalogo'
            }         

            const product = cart.products.find(p => p.id === productRead.id)
            if(product){
                product.quantity = product.quantity + 1
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
         
            }else if (!product){
                cart.products.push({
                    id:productRead.id,
                    quantity:1
                })
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')

            
            }
            
            return cart

        } catch (error) {
            loggerWinston.error(error);
        }
    }



}

export default CartManagerFS
import cartsModel from "../models/carts.model.js";

class CartDaoMongo {
    constructor() {
        this.model = cartsModel
    }

    get = async () => await this.model.find({ isActive: true })

    getBy = async (uid) => await this.model.findOne({_id:uid})
    
    getByEmail = async (userEmail) => await this.model.findOne(userEmail)

    create = async (newCart) => await this.model.create(newCart)
    
    // update = async (cid, newCart) => await this.model.findOneAndUpdate({ _id: cid }, newCart, { new: true })
    
    addProduct = async (cid,product)=>{        
        try {
            const updatedCart = await this.model.findOneAndUpdate(
                { _id: cid, 'products.product': product.id },
                { $inc: { 'products.$.quantity': product.quantity } },
                { new: true }
            )
          
            if (updatedCart) {
                // El producto ya estaba en el carrito, se actualizó su cantidad
                return updatedCart
            }
          
            // El producto no estaba en el carrito, se agrega con quantity en 1
            const newProductInCart = await this.model.findOneAndUpdate(
                { _id: cid },
                { $push: { products: { product: product.id, quantity: product.quantity } } },
                { new: true, upsert: true }
            )
          
            return newProductInCart
        } catch (error) {
            return new Error('Error adding product to cart'+error)
        }

    }

    async deleteItem(cid, pid){
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { product: pid } } },
                { new: true }
            )
        } catch (error) {
            return new Error('Error deleting product from cart'+error)
        }
    }

    delete = async (cid) => await this.model.findOneAndUpdate({ _id: cid }, { isActive: false })

}

export default CartDaoMongo
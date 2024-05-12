    class ProductRepository{
        constructor(productDao){
            this.dao = productDao
        }

        getProducts = async () => await this.dao.get()
        getProductBy = async (filter) => await this.dao.getBy(filter)
        getByStock = async(filter) => await this.dao.getBy(filter)
        createProduct = async (newProduct) => await this.dao.create(newProduct)
        updateProduct = async (pid,productToUpdate) => await this.dao.update(pid,productToUpdate)
        deleteProduct = async (pid) => await this.dao.delete(pid)

}

export default ProductRepository
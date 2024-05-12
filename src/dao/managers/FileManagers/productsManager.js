const fs = require('fs')

class ProductManager {
    constructor (file){
        this.file = file

        const fs = require('fs')

        if (!fs.existsSync(this.file)){
            fs.writeFileSync(this.file,'[]')
            this.products = []
        } else {
            const data = fs.readFileSync(this.file,'utf-8')
            this.products = JSON.parse(data)
        }
    }

    saveFile() {
        const allProducts = JSON.stringify(this.products)

        fs.writeFileSync(this.file, allProducts)
    }

    getProducts(){
        return this.products
    }

    addProduct(product){
        if(!product.title 
            || !product.description 
            || !product.price 
            || !product.thumnail 
            || !product.code 
            || !product.stock )
        {
            return 'Le falta un campo'
        }

        const result = this.products.find(prod => prod.code === product.code)
        if (result){
            return 'ya se encuentra ese codigo ' + product.code + ' ' + result.title
        }
        if (this.products.length === 0){
            this.products.push({...product,id: 1})

        }else {
            this.products.push({...product, id: this.products.length + 1})
        }

        this.saveFile()

        return 'producto agregado'
    }
    getProdById (pid, campo, nuevoElemento){
        const byId = this.products.find(prod => prod.id === pid)

        if (!byId){
            return 'ERROR: ID NOT FOUND'
        } else {
            const {...byCampo} = byId
            let claves = Object.keys(byCampo)
            return claves
        }
    }
    updateProduct(pid){
        const byId = this.products.find(prod => prod.id === pid)

        if (!byId){
            return 'ERROR: ID NOT FOUND'
        } else {
            return byId
        }
    }
    deleteProduct(){}
}
debugger
// //CREACION DE ARREGLO
// const products = new ProductManager('./productos.txt')
// console.log(products.getProducts());
// //SUBIDA DE PRODUCTOS
// console.log(products.addProduct({title:'arroz',description:'20kg',price: 100 ,thumnail:"sinimagen",code:"abc123",stock:10}))
// console.log(products.addProduct({title:'leche',description:'12lt',price: 180 ,thumnail:"sinimagen",code:"888",stock:20}))
// console.log(products.addProduct({title:'huevos',description:'caja',price: 120 ,thumnail:"sinimagen",code:"888",stock:20}))
// console.log(products.addProduct({title:'pañales',description:'paquete',price: 7000 ,thumnail:"sinimagen",code:"111lala"}))

// console.log(products.getProducts());


// //BUSQUEDA POR IDS
// console.log(products.getProdById(1,2,2));
// console.log(products.getProdById(5));





import {Schema, model} from 'mongoose'

const collection = 'carts'

const cartsSchema = new Schema({
    title: String,
    emailUser: {
        type:String,
        unique:true,
        required:true
    },
    products:{
        type:[{
            product:{
                type:Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:{
                type:Number
            }
        }]
    },
    isActive:{
        type: Boolean,
        default:true,
    }

})

cartsSchema.pre('findOne', function(){
    this.populate('products.product')
})

export default model(collection, cartsSchema)
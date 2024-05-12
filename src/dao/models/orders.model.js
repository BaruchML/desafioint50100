import { Schema,model } from "mongoose";

const collection = 'orders'

const orderScheema = new Schema({
    name:String,
    size:{
        type:String,
        enum:["small","medium","big"],
        default: "medium"
    },
    price:Number,
    quantity:Number,
    date:Date
})

export default model(collection,orderScheema)
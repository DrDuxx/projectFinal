const Schema = require('mongoose').Schema
const Model = require('mongoose').model

const productSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    details:{
        type:String,
        trim:true,
        required:true
    },
    image:{
        type:String,
        trim:true,
        required:true
    }
},{
    timestamps:true
})


module.exports = ProductModel = Model('Product',productSchema)

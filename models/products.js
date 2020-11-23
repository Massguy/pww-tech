const mongoose = require('mongoose');

const Product= mongoose.model('Product',{
    name:{required:true, type:String, maxLength:100,trim:true},
    description:{type:String,maxLength:250},
    price:{ value: Number, currency: String },
    type:String,
    department:String,
    weight:String
});

module.exports=Product
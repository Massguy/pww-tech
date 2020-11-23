const express = require('express');
require('./DB/connection')
const Product = require("./models/products")

const app= express();


app.use(express.json())


app.post("/",async (req,res) =>{
    const product = new Product(req.body)

    try{
        await product.save()
        res.status(201).send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

app.get("/",async (req,res)=>{
    let order= req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const {page= 1, limit= 6} = req.query


    try{
        const products = await Product.find({}).sort([[sortBy,order]]).limit(limit * 1).skip((page - 1) * limit)
        
        res.send(products)
    
    }catch(e){
        res.status(500).send()
    }

})

app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});
module.exports = app;
require('dotenv').config
const request = require('supertest')
const app = require('../app')
const Product = require('../models/products')



beforeEach(async () => {
 
  await Product.deleteMany()
  await new Product({
  _id: "5fba72769082f519dc129992",
  name: "Raspberry Pi Zero",
  description: "Raspberry PI Zero Computer",
  price: {
    value: 4.8,
    currency: "GBP"
  },
  type: "Electrical",
  department: "Computing",
  weight: "30g",         
  }).save()
  await new Product({
    _id: "5fb92113770bfa1fd4b8320f",
    name: "Samsung Galaxy Note 2",
    description: "Samsung tablet computer",
    price: {
      value: 299.99,
      currency: "GBP"
    },
    type: "Electrical",
    department: "Computing",
    weight: "569g",
  }).save()
})


test('should create a product', async () => {
    await request(app).post('/').send(
      {
        id: "DRVTHR-BOOK",
        name: "Pass the Driving Test",
        description: "Book - Pass your driving test - Penguin publishers",
        price: {
          value: 7.99,
          currency: "GBP"
        },
        type: "Book",
        department: "Books and Stationery",
        weight: "57g"
      }
    ).expect(201)
})

test('should return STATUS 400 if bad request', async () => {
  await request(app).post('/').send({}).expect(400)
})






test('should fetch all products by price in ascending order', async () => {
  await request(app).get('/?sortBy=price&&order=asc').expect(200)
  .then((res) => {
    expect(res.body[0]).toEqual({
      "_id": "5fba72769082f519dc129992",
      "name": "Raspberry Pi Zero",
      "description": "Raspberry PI Zero Computer",
      "type": "Electrical",
      "price": {
        "value": 4.8,
        "currency": "GBP"
      },
      "department": "Computing",
      "weight": "30g",
      "__v": 0
    });
   });
})
test('should fetch all products by price in descending order', async () => {
  await request(app).get('/?sortBy=price&&order=desc').expect(200)
  .then((res) => {
    expect(res.body[0]).toEqual({
      
      "_id": "5fb92113770bfa1fd4b8320f",
      "name": "Samsung Galaxy Note 2",
      "description": "Samsung tablet computer",
      "price": {
        "value": 299.99,
        "currency": "GBP"
      },
      "type": "Electrical",
      "department": "Computing",
      "weight": "569g",
      "__v": 0
    });
   });
})

test('should return 404', async () => {
  await request(app).get('/productsasa').expect(404)
 
})
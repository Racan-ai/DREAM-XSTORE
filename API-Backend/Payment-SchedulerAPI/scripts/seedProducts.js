const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    _id: new mongoose.Types.ObjectId('60f8c2b5e1b2c8a1b8e4d111'),
    name: 'Oversized t shirt',
    price: 699,
    image: 'https://i.postimg.cc/fRWRqwYP/GPT-model.png',
    isLiked: false,
    slug: 'oversized-t-shirt'
  },
  {
    _id: new mongoose.Types.ObjectId('60f8c2b5e1b2c8a1b8e4d222'),
    name: 'ART ADDICTS T-SHIRT',
    price: 2837,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    isLiked: false,
    slug: 'art-addicts-t-shirt'
  },
  {
    _id: new mongoose.Types.ObjectId('60f8c2b5e1b2c8a1b8e4d333'),
    name: 'ART ADDICTS T-SHIRT (Blue)',
    price: 2837,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    isLiked: false,
    slug: 'art-addicts-t-shirt-2'
  }
];

async function seed() {
await mongoose.connect('mongodb://127.0.0.1:3001/test');
await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded!');
  process.exit();
}

seed();

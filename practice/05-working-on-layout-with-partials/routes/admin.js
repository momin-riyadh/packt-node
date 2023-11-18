const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const multer = require('multer');


const router = express.Router();

const products = [];



// Multer configuration
const storage = multer.diskStorage({
  destination: './public/images/products',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
// Update your add-product route
router.post('/add-product', upload.single('image'), (req, res, next) => {
  console.log(req.file);
  const newProduct = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.file ? '/images/products/' + req.file.filename : '/images/default.svg',
  };

  products.push(newProduct);
  res.redirect('/admin/add-product');
});

exports.routes = router;
exports.products = products;

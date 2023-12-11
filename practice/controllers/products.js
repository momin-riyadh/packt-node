const path = require('path');
const multer = require('multer');
const products = [];

// Multer configuration
const storage = multer.diskStorage({
    destination: './public/images/products',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};


exports.postAddProduct =  (req, res, next) => {
    // Use the upload middleware before processing the form data
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Handle any Multer errors here
            console.error(err);
            return res.status(500).send('Error uploading file.');
        }
        console.log(req.file);
        const newProduct = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.file ? '/images/products/' + req.file.filename : '/images/default.svg',
        };
        products.push(newProduct);
        res.redirect('/');
    });
};

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
};

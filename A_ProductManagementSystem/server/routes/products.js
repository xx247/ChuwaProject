var express = require('express'),
router = express.Router();
const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        product.name = req.body.name ?? product.name;
        product.description = req.body.description ?? product.description;
        product.category = req.body.category ?? product.category;
		product.price = req.body.price ?? product.price;
		product.quantity = req.body.quantity ?? product.quantity;
        product.link = req.body.link ?? product.link;
        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

router.post('/createProduct', createProduct);
router.get('/getProducts', getProducts);
router.get('/getProduct/:id', getProductById);
router.post('/editProduct/:id', editProductById);

module.exports = router;
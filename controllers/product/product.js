const Product = require('../../models/product')

async function addProduct(req, res, next) {
    try {
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(200).send({ product: savedProduct })
        return
    } catch (err) {
        res.status(401).send('Add product fail!', err)
        return
    }
}

async function getAllProducts(req, res, next) {
    try {
        const foundProducts = await Product.find({})
        res.status(200).send({ foundProducts })
        return
    } catch (err) {
        res.status(500).send(`Get all products fail ${err}`)
        return
    }
}

async function getProductById(req, res, next) {
    try {
        const foundProduct = await Product.findOne({ _id: req.query.id })
        res.status(200).send({ foundProduct })
        return
    } catch (err) {
        res.status(500).send(`Get all products fail ${err}`)
        return
    }
}

async function updateProduct(req, res, next) {
    try {
        const fieldToUpdate =  req.body
        const newProduct = await Product.findOneAndUpdate({ _id: req.query.id }, fieldToUpdate, { new: true })
        res.status(200).send({ newProduct })
        return
    } catch (err) {
        res.status(500).send(`Edit products fail ${err}`)
        return
    }
}

async function deleteProduct(req, res, next) {
    try {
        await Product.updateOne({ _id: req.query.id }, { status: false })
        res.status(200).send(`Delete product success`)
        return
    } catch (err) {
        res.status(500).send(`Delete product fail ${err}`)
        return
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
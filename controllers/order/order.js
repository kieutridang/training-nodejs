const Order = require('../../models/order')
const ProductInOrder = require('../../models/productInOrder')

async function addOrder(req, res, next) {
  try {
    const { clientId,
      storeId,
      status,
      totalPrice,
      tax,
      discount } = req.body
    const newOrder = new Order({
      clientId: clientId,
      storeId: storeId,
      status: status,
      totalPrice: totalPrice,
      tax: tax,
      discount: discount
    })
    const savedOrder = await newOrder.save()

    const { productInOrder } = req.body
    productInOrder.forEach(async productInOrder => {
      const newProductInOrder = new ProductInOrder({
        orderId: savedOrder._id,
        productId: productInOrder.productId,
        qty: productInOrder.qty,
        price: productInOrder.price
      })
      await newProductInOrder.save()
    })
    res.status(200).send({ order: savedOrder })
    return
  } catch (err) {
    res.status(401).send(`Add order fail! ${err}`)
    return
  }
}

async function getOrderById(req, res, next) {
  try {
    const foundOrder = await Order.findOne({ _id: req.query.id })
    const productsInOrder = await ProductInOrder.find({ orderId: foundOrder._id }).populate('productId')
    res.status(200).send({ foundOrder, productsInOrder })
  } catch (err) {
    res.status(500).send(`Get order fail ${err}`)
    return
  }
}

async function updateOrder(req, res, next) {
  try {
    const fieldToUpdate = req.body
    const orderId = req.query.id
    const newProductInOrders = fieldToUpdate.productInOrder
    const newOrder = Order.findOneAndUpdate({ _id: orderId }, fieldToUpdate, { new: true })
    const oldProductInOrders = await ProductInOrder.find({ orderId: orderId })
    oldProductInOrders.forEach(async product => {
      await ProductInOrder.findOneAndRemove({ _id: product._id })
    })
    newProductInOrders.forEach(async productInOrder => {
      const newProductInOrder = new ProductInOrder({
        orderId: orderId,
        productId: productInOrder.productId,
        qty: productInOrder.qty,
        price: productInOrder.price
      })
      await newProductInOrder.save()
    })
    res.status(200).send({ newOrder })
    return
  } catch (err) {
    res.status(500).send(`Edit products fail ${err}`)
    return
  }
}

async function deleteOrder(req, res, next) {
  try {
    await Order.updateOne({ _id: req.query.id }, { status: "deleted" })
    res.status(200).send(`Delete order success`)
    return
  } catch (err) {
    res.status(500).send(`Delete order fail ${err}`)
    return
  }
}

module.exports = {
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder
}
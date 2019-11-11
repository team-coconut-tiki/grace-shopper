const router = require('express').Router()
const {Order, User, CartItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [{model: User}]})
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{model: User, include: [Product]}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByPk(req.params.id, {})
    updatedOrder.update({status: req.body.status})
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

//creates a new order
router.post('/:userId', async (req, res, next) => {
  try {
    const currentCart = await CartItem.findAll({
      where: {userId: req.params.userId}
    })
    const newOrder = await Order.create({status: 'open'})
    newOrder.update({
      userId: req.params.userId,
      subtotalInCents: req.body.subtotal
    })
    currentCart.forEach(cart => {
      cart.update({orderId: newOrder.id})
    })
    res.json(currentCart)
  } catch (error) {
    next(error)
  }
})

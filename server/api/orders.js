const router = require('express').Router()
const {Order, User, CartItem, Product} = require('../db/models')
module.exports = router

//get all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [{model: User}]})
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//updates order from admin view
router.put('/:id', async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByPk(req.params.id, {})
    updatedOrder.update({status: req.body.status})
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

//get order by id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{model: CartItem, include: [Product]}, {model: User}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//get user's orders
router.get('/users/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      },
      order: [['createdAt', 'DESC']]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//update order status by user
router.put('/users/:userId', async (req, res, next) => {
  try {
    const updatedOrder = await Order.update(
      {status: req.body.nextStatus},
      {
        where: {
          userId: req.params.userId,
          status: req.body.prevStatus
        }
      }
    )
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

//creates a new order for a user
router.post('/users/:userId', async (req, res, next) => {
  try {
    const currentCart = await CartItem.findAll({
      where: {
        userId: req.params.userId,
        orderId: null
      }
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

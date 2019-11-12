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

//get order by id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{model: CartItem, include: [Product, User]}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//update order status by user
router.put('/users/:userId', async (req, res, next) => {
  try {
    const updatedOrder = await Order.update(
      {status: req.body.status},
      {
        where: {
          userId: req.params.userId,
          status: 'open'
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

const router = require('express').Router()
const {Order, User, Product, CartItem} = require('../db/models')
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
      include: [{model: CartItem}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [{model: User}]})
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

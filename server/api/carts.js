const router = require('express').Router()
const {CartItem, User, Product} = require('../db/models')

//creates a new cart item
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    const existingCart = await CartItem.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        orderId: null
      }
    })
    if (existingCart) {
      await existingCart.update({
        quantity: existingCart.quantity + 1
      })
      res.json(existingCart)
    } else {
      const thisUser = await User.findByPk(req.params.userId)
      const thisProduct = await Product.findByPk(req.params.productId)
      await thisUser.addProduct(thisProduct)
      const newCart = await CartItem.findOne({
        where: {
          userId: req.params.userId,
          productId: req.params.productId,
          orderId: null
        }
      })
      newCart.update({quantity: 1, priceInCents: req.body.priceInCents})

      res.json(newCart)
    }
  } catch (err) {
    next(err)
  }
})

//delete cart item
router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    const thisCart = await CartItem.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        orderId: null //delete only item in active cart
      }
    })
    await thisCart.destroy()
    res.status(202).end()
  } catch (err) {
    next(err)
  }
})

//update cart item
router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const thisCart = await CartItem.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        orderId: null //delete only item in active cart
      }
    })
    await thisCart.update(req.body)
    res.json(thisCart)
  } catch (err) {
    next(err)
  }
})
module.exports = router

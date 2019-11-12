const router = require('express').Router()
const {CartItem, User, Product} = require('../db/models')

//no need to 'get' any cart item; will be pulled via Product or User table/routes

//creates a new cart item
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    // console.log(req.user) // no req.user when guest account 'created'
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
    if (req.user.id === +req.params.userId) {
      const thisCart = await CartItem.findOne({
        where: {
          userId: req.user.id,
          productId: req.params.productId,
          orderId: null //delete only item in active cart
        }
      })
      await thisCart.update(req.body)
      res.json(thisCart)
    } else res.status(401).end()
  } catch (err) {
    next(err)
  }
})
module.exports = router

const router = require('express').Router()
const {CartItem, User, Product} = require('../db/models')

//find all user's active cart items
router.get('/:userId', async (req, res, next) => {
  try {
    const userCarts = await CartItem.findAll({
      where: {
        userId: req.params.userId,
        orderId: null
      },
      include: [{model: Product}]
    })
    res.json(userCarts)
  } catch (err) {
    next(err)
  }
})

//find all user's cart items, including previous orders
router.get('/:userId/all', async (req, res, next) => {
  try {
    const userCarts = await CartItem.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userCarts)
  } catch (err) {
    next(err)
  }
})

//creates a new cart item
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    // const thisUser = User.findAll({
    //   where: {
    //     id: req.params.userId
    //   }
    // })
    // const newCart = await thisUser.addProduct(req.params.productId)
    // await newCart.update(req.body)
    const existingCart = await CartItem.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    if (existingCart) {
      await existingCart.update({
        quantity: existingCart.quantity + req.body.quantity
      })
      res.json(existingCart)
    } else {
      const newCart = await CartItem.findOrCreate({
        userId: req.params.userId,
        productId: req.params.productId,
        quantity: req.body.quantity,
        priceInCents: req.body.priceInCents
      })
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
    res.sendStatus(202)
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

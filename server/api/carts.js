const router = require('express').Router()
const {CartItem, User, Product} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const userCart = await CartItem.findAll({
      where: {
        userId: req.user.id,
        orderId: null
      }
    })
    res.json(userCart)
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
        productId: req.params.productId,
        orderId: null
      }
    })
    if (existingCart) {
      await existingCart.update({
        quantity: existingCart.quantity++
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

      // const newCart = await CartItem.create({
      //   userId: req.params.userId,
      //   productId: req.params.productId,
      //   quantity: 1,
      //   priceInCents: req.body.priceInCents
      // })
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

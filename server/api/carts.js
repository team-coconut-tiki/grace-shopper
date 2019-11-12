const router = require('express').Router()
const {CartItem, User, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allCarts = await CartItem.findAll()
    res.json(allCarts)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userCart = await CartItem.findAll({
      where: {
        userId: req.params.userId,
        orderId: null
      }
    })
    res.json(userCart)
  } catch (error) {
    next(error)
  }
})

//creates a new cart item
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    // no req.user when guest account 'created'
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
      const addedToCart = await CartItem.findByPk(existingCart.id)
      res.json(addedToCart)
    } else {
      const newCart = await CartItem.create({
        quantity: 1,
        priceInCents: req.body.priceInCents
      })
      await newCart.setProduct(req.params.productId)
      await newCart.setUser(req.params.userId)
      const addedToCart = await CartItem.findByPk(newCart.id)
      res.json(addedToCart)
    }
  } catch (err) {
    next(err)
  }
})

//delete cart item
router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    //we can also refactor this to find by cart Id now!
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
    // if (req.user.id === +req.params.userId) {
    const thisCart = await CartItem.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        orderId: null //update only item in active cart
      }
    })
    await thisCart.update(req.body)
    const updatedCart = await CartItem.findByPk(thisCart.id, {
      include: [{model: Product}]
    })
    res.json(updatedCart)
    // } else res.status(401).end()
  } catch (err) {
    next(err)
  }
})
module.exports = router

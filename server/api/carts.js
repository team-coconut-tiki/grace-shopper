const router = require('express').Router()
const {CartItem, User} = require('../db/models')
module.exports = router

//find all user's cart items
router.get('/:userId', async (req, res, next) => {
  try {
    const userCarts = await CartItem.findAll({
      include: [{model: User}],
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
    const thisUser = User.findAll({
      where: {
        id: req.params.userId
      }
    })
    const newCart = thisUser.addProduct(req.params.productId)
    newCart.update(req.body)
    res.json(newCart)
  } catch (err) {
    next(err)
  }
})

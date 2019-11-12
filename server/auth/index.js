const router = require('express').Router()
const User = require('../db/models/user')
const {Product, CartItem} = require('../db/models')

module.exports = router

router.use('/google', require('./google'))

router.post('/login', async (req, res, next) => {
  try {
    console.log('login')
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      //TO FIX WHEN WE FIX DB
      //if there is a guest login
      // console.log('requ', req.user)
      // if (req.user) {
      //   //get cart items from guest login
      //   const tempCart = await CartItem.findAll({
      //     where: {
      //       userId: req.user.id
      //     }
      //   })
      //   //get user's saved cart
      //   const loginCart = await CartItem.findAll({
      //     where: {
      //       userId: user.id,
      //       orderId: null
      //     }
      //   })
      //   console.log('carts', tempCart, loginCart)
      //   //flatten saved cart for comparison purposes
      //   const flatLoginCart = loginCart.map(cart => cart.productId)
      //   console.log('flat', flatLoginCart)
      //   tempCart.forEach(async cart => {
      //     //find if guest cartitem exists for logged in user
      //     if (flatLoginCart.includes(cart.productId)) {
      //       //merge if so
      //       console.log('it does')
      //       const existingCart = await CartItem.findOne({
      //         where: {
      //           userId: user.id,
      //           productId: cart.productId,
      //           orderId: null
      //         }
      //       })
      //       await existingCart.update({
      //         quantity: existingCart.quantity + cart.quantity
      //       })
      //     }
      //     //otherwise, add row
      //     await cart.update({
      //       userId: user.id
      //     })
      //   })
      // }
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    if (req.user) {
      // console.log('signup', req.user)
      const user = await User.findByPk(req.user.id)
      await user.update({
        email: req.body.email,
        password: req.body.password
      })
      req.login(user, err => (err ? next(err) : res.json(user)))
    } else {
      const user = await User.create(req.body)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

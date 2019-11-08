const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/admin', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{model: Order}]
      //attributes: ['status']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//find all active carts
router.get('/:id/cart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{model: Product}] //give us the cart as 'products', including past orders
    })
    if (!user) {
      let err = new Error('No user found')
      err.status = 404
      throw err
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      let err = new Error('No user found')
      err.status = 404
      throw err
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await User.update(req.body, {where: {id: req.params.id}})
    const user = await User.findByPk(req.params.id)
    if (!user) {
      let err = new Error('No user found')
      err.status = 404
      throw err
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      throw new Error('User already exists!')
    }
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

//works kind of
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      let err = new Error('No user found')
      err.status = 404
      throw err
    }
    await user.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

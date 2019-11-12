const router = require('express').Router()
const {User, Order, Product, CartItem} = require('../db/models')
module.exports = router

router.get('/page/:page', async (req, res, next) => {
  // example http request route:
  // /api/users/page/1?order="createdAt"&isAdmin="true"
  // /api/users/page/1?order="fullName"&isAdmin="false"&
  const limit = 10
  // const status = req.query.status ? req.query.status : null // for orders
  const order = req.query.order ? JSON.parse(req.query.order) : null
  const isAdmin = req.query.isAdmin ? req.query.isAdmin === 'true' : null
  try {
    const users = await User.findAll({
      include: [{model: Order}],
      limit: limit,
      order: order,
      where: {isAdmin},
      offset: (req.params.page - 1) * limit
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

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

//find all of a user's carts
router.get('/:id/cart', async (req, res, next) => {
  try {
    // if (req.user.id === req.params.id) {
    const user = await CartItem.findAll({
      where: {
        userId: req.params.id,
        orderId: null
      },
      include: [{model: Product}]
    })

    if (!user) {
      let err = new Error('No user found')
      err.status = 404
      throw err
    }
    res.json(user)
    // } else res.status(401).end()
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{model: Order}]
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
    // const user = await User.findByPk(req.params.id)
    // if (user) {
    //   throw new Error('User already exists!')
    // }

    //body should be {}
    // console.log('in post route')
    const newUser = await User.create(req.body)
    req.login(newUser, err => (err ? next(err) : res.json(newUser)))
    console.log('after creating new user')
  } catch (err) {
    next(err)
  }
})

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

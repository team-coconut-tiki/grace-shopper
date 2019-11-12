const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/page/:page', async (req, res, next) => {
  // example http request route:
  // /api/products/page/1?category=Coconuts&order=[["priceInCents","asc"]]
  const limit = 10
  const cat = req.query.category
  const order = req.query.order ? JSON.parse(req.query.order) : null
  try {
    const products = await Product.findAll({
      include: [{model: Category, where: {type: cat}}],
      limit: limit,
      order: order,
      offset: (req.params.page - 1) * limit
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      include: [{model: Category}],
      attributes: [
        'id',
        'title',
        'description',
        'priceInCents',
        'inventory',
        'imageUrl'
      ]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create({
      title: req.body.title,
      description: req.body.description,
      priceInCents: +req.body.priceInCents,
      inventory: +req.body.inventory,
      imageUrl: req.body.imageUrl
    })
    req.body.categories.forEach(async category => {
      const thisCat = await Category.findOne({
        where: {
          type: category
        }
      })
      await newProduct.addCategory(thisCat.id)
    })
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [{model: Category}]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [{model: Category}]
    })
    await product.update({
      title: req.body.title,
      description: req.body.description,
      priceInCents: +req.body.priceInCents,
      quantity: +req.body.quantity,
      imageUrl: req.body.imageUrl
    })
    //remove deleted categories
    product.categories.forEach(async category => {
      if (!req.body.categories.includes(category.type)) {
        await product.removeCategory(category.id)
      }
    })
    //add new categories
    req.body.categories.forEach(async category => {
      const thisCat = await Category.findOne({
        where: {
          type: category
        }
      })
      await product.addCategory(thisCat.id)
    })
    const updatedProduct = await Product.findByPk(req.params.productId, {
      include: [{model: Category}]
    })
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

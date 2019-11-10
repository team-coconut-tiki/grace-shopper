const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  // console.log(req.session)
  // console.log(req.user)
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
        'quantity',
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
      quantity: +req.body.quantity,
      imageUrl: req.body.imageUrl
    })
    req.body.categories.forEach(async category => {
      const thisCat = await Category.findOne({
        where: {
          type: category.type
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

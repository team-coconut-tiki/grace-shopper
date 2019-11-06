const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      include: [{model: Category}],
      attributes: [
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

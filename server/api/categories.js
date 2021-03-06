const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //slightly more secure, using req.body.type
    const newCategory = await Category.create({type: req.body.type})
    res.json(newCategory)
  } catch (err) {
    next(err)
  }
})

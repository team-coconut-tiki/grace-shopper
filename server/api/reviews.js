const router = require('express').Router()
const {Review, User} = require('../db/models')
module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {productId: req.params.productId}
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    const previousReview = await Review.findOne({
      where: {
        userId: req.body.userId,
        productId: req.params.productId
      }
    })
    if (!previousReview) {
      const review = await Review.create({
        description: req.body.description,
        rating: req.body.rating,
        userId: req.body.userId,
        productId: req.params.productId
      })
      res.json(review)
    } else {
      throw new Error('You have already reviewed this product!')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let review = await Review.findByPk(req.params.id)
    if (review.userId === req.body.userId || req.body.isAdmin) {
      await Review.update(req.body, {where: {id: req.params.id}})
    }
    review = await Review.findByPk(req.params.id)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.productId)
    await review.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

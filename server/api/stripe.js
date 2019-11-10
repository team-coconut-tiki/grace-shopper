const router = require('express').Router()
const stripe = require('stripe')('sk_test_3KX0CCTo6VhBbuNWFpTA7yTh00r7Dk6wEO')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.lineItems,
      success_url: 'https://localhost:8080/success',
      cancel_url: 'https://localhost:8080'
    })
    res.json(session)
  } catch (error) {
    next(error)
  }
})

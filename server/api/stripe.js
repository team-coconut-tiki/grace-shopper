const router = require('express').Router()
const stripe = require('stripe')('sk_test_3KX0CCTo6VhBbuNWFpTA7yTh00r7Dk6wEO')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log('in the route', req.body)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body,
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080'
    })
    res.json(session)
  } catch (error) {
    next(error)
  }
})
router.put('/:sessionId', async (req, res, next) => {
  try {
    if (req.params.sessionId === req.session.id) {
      const session = await stripe.checkout.sessions.findByPk(req.session.id)
      await session.update({
        payment_method_types: req.body.payment_method_types,
        line_items: req.body.lineItems
      })
      const updatedSession = await stripe.checkout.sessions.findByPk(
        req.session.id
      )
      res.json(updatedSession)
    } else res.status(401).end()
  } catch (error) {
    next(error)
  }
})
router.delete('/:sessionId', async (req, res, next) => {
  try {
    if (req.params.sessionId === req.session.id) {
      const session = await stripe.checkout.sessions.findByPk(req.session.id)
      await session.destroy()
      res.status(202).end()
    } else res.status(401).end()
  } catch (error) {
    next(error)
  }
})

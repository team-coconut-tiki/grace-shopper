const router = require('express').Router()
const stripe = require('stripe')('pk_test_pReitL4ywW7aWvUlEbjYeiFO00sZCjLWB7')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'T-shirt',
          description: 'Comfortable cotton t-shirt',
          images: ['https://example.com/t-shirt.png'],
          amount: 500,
          currency: 'usd',
          quantity: 1
        }
      ],
      success_url:
        'https://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://localhost:8080/cancel'
    })
    res.json(session)
  } catch (error) {
    next(error)
  }
})

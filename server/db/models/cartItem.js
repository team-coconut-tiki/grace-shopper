const db = require('../db')
const Sequelize = require('sequelize')

const CartItem = db.define('cart_item', {
  priceInCents: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = CartItem

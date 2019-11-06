const db = require('../db')
const Sequelize = require('sequelize')

const CartItem = db.define('cart_item', {
  priceInCents: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = CartItem

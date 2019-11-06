const db = require('../db')
const Sequelize = require('sequelize')

const CartItem = db.define('cartItem', {
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

const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  subtotalInCents: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  shippingInCents: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  taxInCents: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  totalInCents: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  status: {
    type: Sequelize.ENUM('open', 'paid', 'shipped', 'completed', 'cancelled')
  }
})

module.exports = Order

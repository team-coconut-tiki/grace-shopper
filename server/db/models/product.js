const db = require('../db')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  priceInCents: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isURL: true
    },
    allowNull: false,
    defaultValue: 'https://robohash.org/coconut'
  },
  createdAt: {
    type: Sequelize.NOW
  },
  allowNull: false
})

module.exports = Product

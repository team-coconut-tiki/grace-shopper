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
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isURL: true
    },
    allowNull: false,
    defaultValue: 'https://images.theteafarm.com/coconut_flavor.jpg'
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Product

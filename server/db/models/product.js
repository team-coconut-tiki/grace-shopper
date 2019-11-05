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
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['outOfStock', 'inStock', 'runningLow'],
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
    allowNull: false
  },
  createdAt: {
    type: Sequelize.NOW
  },
  allowNull: false
})

module.exports = Product

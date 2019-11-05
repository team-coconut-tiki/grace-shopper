const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  type: Sequelize.ENUM([
    'indoor',
    'outdoor',
    'bar_items',
    'coconuts',
    'apparel',
    'home_goods',
    'luau',
    'sports'
  ])
})

module.exports = Category

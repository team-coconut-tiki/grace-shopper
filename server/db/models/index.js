const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Review = require('./review')
const Order = require('./order')
const CartItem = require('./cartItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Category.belongsToMany(Product, {through: 'ProductCategory'})
Product.belongsToMany(Category, {through: 'ProductCategory'})

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

// Product.belongsToMany(User, {through: CartItem})
// User.belongsToMany(Product, {through: CartItem})

Product.hasMany(CartItem)
CartItem.belongsTo(Product)

User.hasMany(CartItem)
CartItem.belongsTo(User)

CartItem.belongsTo(Order)
Order.hasMany(CartItem)

User.hasMany(Order)
Order.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Category,
  Review,
  Order,
  CartItem
}

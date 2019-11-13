'use strict'

const faker = require('faker')
const db = require('../server/db')
const {
  User,
  Product,
  Review,
  Category,
  Order,
  CartItem
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 0; i < 10; i++) {
    await User.create({
      email: faker.internet.email(),
      password: '12345',
      fullName: faker.name.findName(),
      shippingAddress: faker.fake(
        '{{address.streetName}}, {{address.city}}, {{address.state}}, {{address.zipCode}}'
      ),
      billingAddress: faker.fake(
        '{{address.streetName}}, {{address.city}}, {{address.state}}, {{address.zipCode}}'
      ),
      creditCard: '4242 4242 4242 4242',
      isAdmin: faker.random.boolean()
    })
  }

  function randomCategoryNum() {
    let num = Math.floor(Math.random() * 8)
    return num === 4 ? randomCategoryNum() : num
  }

  function randomPriceNum() {
    let num = Math.floor(Math.random() * (999999 - 99)) + 99
    return num
  }

  const products = await Promise.all([
    Product.create({
      title: 'Dwarf Coconut',
      priceInCents: 700,
      description: 'it is a tiny coconut',
      inventory: 3
    }),
    Product.create({
      title: 'Tall Coconut',
      priceInCents: 7200,
      description: 'it is soooo tall. How is the weather up there?',
      inventory: 100
    }),
    Product.create({
      title: 'Hybrid Coconut',
      priceInCents: 12700,
      description: 'This coconut runs on gas AND electricity!',
      inventory: 3
    }),
    Product.create({
      title: 'Malayan Yellow Dwarf Coconut',
      priceInCents: 500,
      description:
        'extremely high yielding, and best grown in tropical locations',
      inventory: 30
    }),
    Product.create({
      title: 'Dwarf Orange Coconut',
      priceInCents: 700,
      description: 'Ever wondered what a coconut that is orange tastes like?',
      inventory: 13
    }),
    Product.create({
      title: 'Maypan Coconut',
      priceInCents: 9000,
      description:
        'This coconut is from Jamaica and is also known as a "sturdy coconut".',
      inventory: 24
    }),
    Product.create({
      title: 'King Coconut',
      priceInCents: 70000,
      description: 'King of all coconut!',
      inventory: 1
    }),
    Product.create({
      title: 'Fiji Dwarf Coconut',
      priceInCents: 100,
      description: 'So smol, this coconut',
      inventory: 90
    }),
    Product.create({
      title: 'Macapuno Coconut',
      priceInCents: 7600,
      description: 'aka kopyor coconut, is a dwarf mutant tree. AHH!',
      inventory: 300
    }),
    Product.create({
      title: 'East Coast Tall Coconut',
      priceInCents: 1000,
      description: "Hey, I'm coconut, 'ere!",
      inventory: 30
    }),
    Product.create({
      title: 'West Coast Tall Coconut',
      priceInCents: 1000,
      description: 'dude... where is my coconut??',
      inventory: 30
    }),
    Product.create({
      title: 'Golden Malay Coconut',
      priceInCents: 2500,
      description: 'like a normal coconut, but golden',
      inventory: 1200
    })
  ])

  const reviews = await Promise.all([
    Review.create({
      title: 'This is a title',
      description: 'Best coconuts north of Wisconsin',
      rating: 5,
      userId: 2,
      productId: 5
    }),
    Review.create({
      title: 'this is also a title',
      description: 'Rotten Coconuts are no fun!',
      rating: 1,
      userId: 1,
      productId: 5
    }),
    Review.create({
      title: 'this is another a title',
      description:
        'Sad boy seemed to cheer up a little bit. He was still sad so not giving a 1, but very disappointed. I almost saw a smile!',
      rating: 2,
      userId: 1,
      productId: 3
    }),
    Review.create({
      title: 'Food Reviews',
      description: 'My disappointment is immeasurable and my day is ruined',
      productId: 7,
      userId: 1,
      rating: 1
    })
  ])

  const categories = await Promise.all([
    Category.create({type: 'Indoor'}),
    Category.create({type: 'Outdoor'}),
    Category.create({type: 'Bar Items'}),
    Category.create({type: 'Coconuts'}),
    Category.create({type: 'Apparel'}),
    Category.create({type: 'Home Goods'}),
    Category.create({type: 'Luau'}),
    Category.create({type: 'Sports'})
  ])

  const extraCoconut = await Product.create({
    title: 'extra Coconut',
    priceInCents: 2500,
    description: 'like a normal coconut, but extra (like, with categories)',
    inventory: 1200
  })

  await extraCoconut.addCategories([1, 2, 3]) //add by ID only, in an array

  for (let i = 0; i < 12; i++) {
    await products[i].addCategory(4) // add by ID only
  }

  for (let i = 13; i < 100; i++) {
    const thisProduct = await Product.create({
      title: faker.fake('{{commerce.productAdjective}} {{commerce.product}}'),
      priceInCents: randomPriceNum(),
      description: faker.lorem.paragraph(),
      inventory: faker.random.number(),
      imageUrl: faker.image.imageUrl()
    })
    thisProduct.addCategory(randomCategoryNum())
  }

  const extraUser = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.name.findName(),
    shippingAddress: faker.fake(
      '{{address.streetName}}, {{address.city}}, {{address.state}}, {{address.zipCode}}'
    ),
    billingAddress: faker.fake(
      '{{address.streetName}}, {{address.city}}, {{address.state}}, {{address.zipCode}}'
    ),
    creditCard: '4242 4242 4242 4242'
  })
  // await extraUser.addProduct(1)
  // const thisCart = await CartItem.findAll({
  //   where: {
  //     productId: 1,
  //     userId: extraUser.id
  //   }
  // })
  // thisCart.update({
  //   quantity: 5,
  //   priceInCents: 500
  // })

  const newCart = await CartItem.create({
    quantity: 100,
    priceInCents: 100 //prices won't be accurate, because... they were on sale! ...or marked up
  })
  await newCart.setProduct(6)
  await newCart.setUser(3)
  // await newCart.setOrder(1)

  // await CartItem.findByPk(1, {include: [{model: User}, {model: Product}]})

  // console.log(newCart.__proto__)
  // const new2Cart = await CartItem.create({
  //   // userId: 1,
  //   // productId: 2,
  //   quantity: 100,
  //   priceInCents: 100 //prices won't be accurate, because... they were on sale! ...or marked up
  // })

  // magic methods:
  // getProduct
  // setProduct
  // createProduct
  // getUser
  // setUser
  // createUser
  // getOrder
  // setOrder
  // createOrder

  // await CartItem.create({
  //   productId: 2,
  //   userId: 4,
  //   quantity: 3,
  //   priceInCents: 4000
  // })
  // await CartItem.create({
  //   productId: 3,
  //   userId: 1,
  //   quantity: 12,
  //   priceInCents: 300
  // })
  // await CartItem.create({
  //   productId: 7,
  //   userId: 11,
  //   quantity: 1,
  //   priceInCents: 1499
  // })
  // await CartItem.create({
  //   productId: 11,
  //   userId: 8,
  //   quantity: 3,
  //   priceInCents: 699
  // })

  //get order for user 1
  const activeCarts = await CartItem.findAll({
    where: {
      userId: 1,
      orderId: null
    }
  })
  let subtotal = 0
  for (let i = 0; i < activeCarts.length; i++) {
    subtotal += activeCarts[i].priceInCents * activeCarts[i].quantity
  }
  const newOrder = await Order.create({
    subtotalInCents: subtotal,
    status: 'open',
    userId: 1
  })

  for (let i = 0; i < activeCarts.length; i++) {
    await activeCarts[i].update({orderId: newOrder.id})
  }
  //get order for user 8
  const activeCartsJr = await CartItem.findAll({
    where: {
      userId: 8,
      orderId: null
    }
  })
  let subtotalJr = 0
  for (let i = 0; i < activeCartsJr.length; i++) {
    subtotalJr += activeCartsJr[i].priceInCents * activeCartsJr[i].quantity
  }
  const newOrderJr = await Order.create({
    subtotalInCents: subtotalJr,
    status: 'paid',
    userId: 8
  })

  for (let i = 0; i < activeCartsJr.length; i++) {
    await activeCartsJr[i].update({orderId: newOrderJr.id})
  }
  //get order for user 11
  const activeCartsSr = await CartItem.findAll({
    where: {
      userId: 11,
      orderId: null
    }
  })
  let subtotalSr = 0
  for (let i = 0; i < activeCartsSr.length; i++) {
    subtotalSr += activeCartsSr[i].priceInCents * activeCartsSr[i].quantity
  }
  const newOrderSr = await Order.create({
    subtotalInCents: subtotalSr,
    status: 'shipped',
    userId: 11
  })

  for (let i = 0; i < activeCartsSr.length; i++) {
    await activeCartsSr[i].update({orderId: newOrderSr.id})
  }

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

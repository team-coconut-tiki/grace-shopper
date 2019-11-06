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
  }

  const products = await Promise.all([
    Product.create({
      title: 'Dwarf Coconut',
      priceInCents: 700,
      description: 'it is a tiny coconut',
      quantity: 3
    }),
    Product.create({
      title: 'Tall Coconut',
      priceInCents: 7200,
      description: 'it is soooo tall. How is the weather up there?',
      quantity: 100
    }),
    Product.create({
      title: 'Hybrid Coconut',
      priceInCents: 12700,
      description: 'This coconut runs on gas AND electricity!',
      quantity: 3
    }),
    Product.create({
      title: 'Malayan Yellow Dwarf Coconut',
      priceInCents: 500,
      description:
        'extremely high yielding, and best grown in tropical locations',
      quantity: 30
    }),
    Product.create({
      title: 'Dwarf Orange Coconut',
      priceInCents: 700,
      description: 'Ever wondered what a coconut that is orange tastes like?',
      quantity: 13
    }),
    Product.create({
      title: 'Maypan Coconut',
      priceInCents: 9000,
      description:
        'This coconut is from Jamaica and is also known as a "sturdy coconut".',
      quantity: 24
    }),
    Product.create({
      title: 'King Coconut',
      priceInCents: 70000,
      description: 'King of all coconut!',
      quantity: 1
    }),
    Product.create({
      title: 'Fiji Dwarf Coconut',
      priceInCents: 100,
      description: 'So smol, this coconut',
      quantity: 90
    }),
    Product.create({
      title: 'Macapuno Coconut',
      priceInCents: 7600,
      description: 'aka kopyor coconut, is a dwarf mutant tree. AHH!',
      quantity: 300
    }),
    Product.create({
      title: 'East Coast Tall Coconut',
      priceInCents: 1000,
      description: "Hey, I'm coconut, 'ere!",
      quantity: 30
    }),
    Product.create({
      title: 'West Coast Tall Coconut',
      priceInCents: 1000,
      description: 'dude... where is my coconut??',
      quantity: 30
    }),
    Product.create({
      title: 'Golden Malay Coconut',
      priceInCents: 2500,
      description: 'like a normal coconut, but golden',
      quantity: 1200
    })
  ])

  const reviews = await Promise.all([
    Review.create({description: 'Best coconuts north of Wisconsin', rating: 5}),
    Review.create({description: 'Rotten Coconuts are no fun!', rating: 1})
  ])

  const categories = await Promise.all([
    Category.create({type: 'indoor'}),
    Category.create({type: 'outdoor'}),
    Category.create({type: 'bar_items'}),
    Category.create({type: 'coconuts'}),
    Category.create({type: 'apparel'}),
    Category.create({type: 'home_goods'}),
    Category.create({type: 'luau'}),
    Category.create({type: 'sports'})
  ])

  const extraCoconut = await Product.create({
    title: 'extra Coconut',
    priceInCents: 2500,
    description: 'like a normal coconut, but extra (like, with categories)',
    quantity: 1200
  })

  await extraCoconut.addCategories([1, 2, 3]) //add by ID only, in an array

  for (let i = 0; i < products.length; i++) {
    await products[i].addCategory(4) // add by ID only
  }

  //console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${categories.length} categories`)
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

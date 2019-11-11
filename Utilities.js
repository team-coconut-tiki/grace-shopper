export const dollarsInDollars = priceInCents => {
  if (priceInCents < 10) {
    return `.0${priceInCents}`
  }
  return `${Math.floor(priceInCents / 100)}.${priceInCents
    .toString()
    .slice(-2)}`
}

export const totalItems = (arr, key) => {
  return arr.reduce((acc, cur) => {
    acc += cur.cart_items[key]
  }, 0)
}

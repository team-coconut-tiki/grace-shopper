export const dollarsInDollars = priceInCents => {
  return `${priceInCents / 100}`
}

export const totalItems = (arr, key) => {
  return arr.reduce((acc, cur) => {
    acc += cur.cart_items[key]
  }, 0)
}

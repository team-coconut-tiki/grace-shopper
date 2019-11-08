export const dollarsInDollars = priceInCents => {
  return Math.floor(priceInCents / 100)
    .toString()
    .slice(-2)
}

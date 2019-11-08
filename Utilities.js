export const dollarsInDollars = priceInCents => {
  return `${Math.floor(priceInCents / 100)}.${priceInCents
    .toString()
    .slice(-2)}`
}

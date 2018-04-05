let isSellingAvailable = false

const getSelling = () => isSellingAvailable
const setSelling = toggleValue => {
  isSellingAvailable = !!toggleValue
  return isSellingAvailable
}

module.exports = { getSelling, setSelling }

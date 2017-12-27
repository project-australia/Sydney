const ConfigurationService = require('../services/configurations')

const getSellingToggle = async (req, res) => {
  const isSellingAvailable = await ConfigurationService.getSelling()
  res.status(200).json(isSellingAvailable)
}

const setSellingToggle = async (req, res) => {
  const isSellingAvailable = await ConfigurationService.setSelling(req.body.selling)
  res.status(200).json(isSellingAvailable)
}

module.exports = {
  getSellingToggle,
  setSellingToggle
}

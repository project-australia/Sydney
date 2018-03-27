const shippo = require('shippo')(
  'shippo_test_4528a0e5077a93caee2a563d404739896cda6c12'
)

const addressFrom = {
  name: 'Shawn Ippotle',
  street1: '215 Clayton St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94117',
  country: 'US',
  phone: '+1 555 341 9393',
  email: 'shippotle@goshippo.com'
}

const addressTo = {
  name: 'Mr Hebert Porto',
  street1: '223 E. Concord Street',
  city: 'Orlando',
  state: 'FL',
  zip: '32801',
  country: 'US',
  phone: '+1 555 341 9393',
  email: 'hebertporto@gmail.com'
}

const parcelSample = {
  length: '5',
  width: '5',
  height: '5',
  distance_unit: 'in',
  weight: '2',
  mass_unit: 'lb'
}

const generateShippingLabel = async (
  from = addressFrom,
  to = addressTo,
  parcel = parcelSample
) => {
  const {
    tracking_url_provider,
    label_url,
    tracking_number,
    address_from,
    address_to,
    address_return
  } = await shippo.shipment.create(
    {
      address_from: from,
      address_to: to,
      parcels: [parcel],
      async: true
    },
    firstRate
  )

  return {
    trackingUrl: tracking_url_provider,
    labelUrl: label_url,
    trackingNumber: tracking_number,
    addresses: {
      from: address_from,
      to: address_to,
      return: address_return
    }
  }
}

const firstRate = async (err, shipment) => {
  if (err) {
    console.error('Error during generating Label', err)
  }

  return shippo.transaction.create(
    {
      rate: shipment.rates[0].object_id,
      label_file_type: 'PDF',
      async: true
    },
    onError
  )
}

const onError = (err, transaction) => {
  console.log('transcption shippiment', err)
  console.log('transcption shippiment', transaction)
};

module.exports = {
  generateShippingLabel
}

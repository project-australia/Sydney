const shippo = require('shippo')('shippo_test_4528a0e5077a93caee2a563d404739896cda6c12')

const addressFrom = {
  'name': 'Shawn Ippotle',
  'street1': '215 Clayton St.',
  'city': 'San Francisco',
  'state': 'CA',
  'zip': '94117',
  'country': 'US',
  'phone': '+1 555 341 9393',
  'email': 'shippotle@goshippo.com'
}

const addressTo = {
  'name': 'Mr Hebert Porto',
  'street1': '223 E. Concord Street',
  'city': 'Orlando',
  'state': 'FL',
  'zip': '32801',
  'country': 'US',
  'phone': '+1 555 341 9393',
  'email': 'hebertporto@gmail.com'
}

const parcel = {
  'length': '5',
  'width': '5',
  'height': '5',
  'distance_unit': 'in',
  'weight': '2',
  'mass_unit': 'lb'
}

shippo.shipment.create({
  'address_from': addressFrom,
  'address_to': addressTo,
  'parcels': [parcel],
  'async': false
}, (err, shipment) => {
  var rate = shipment.rates[0]
  console.log('transcption shippiment', err)
  // Purchase the desired rate.
  shippo.transaction.create({
    'rate': rate.object_id,
    'label_file_type': 'PDF',
    'async': false
  }, (err, transaction) => {
    console.log('transcption shippiment', err)
    console.log('transcption shippiment', transaction)
  })
})

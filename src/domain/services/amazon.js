const amazon = require('amazon-product-api')

const client = () => {
  const { AWS_ID, AWS_SECRET, AWS_TAG } = process.env
  return amazon.createClient({
    awsId: AWS_ID,
    awsSecret: AWS_SECRET,
    awsTag: AWS_TAG
  })
}

async function lookupByISBN (isbn) {
  const formattedIsbn = isbn.replace(/-/, '')
  return client().itemLookup({
    idType: 'ISBN',
    itemId: formattedIsbn,
    ResponseGroup: 'SalesRank,Offers,ItemAttributes,Images'
  })
}

module.exports = { lookupByISBN }

const amazon = require('amazon-product-api')

const { AWS_ID, AWS_SECRET, AWS_TAG } = process.env

const client = amazon.createClient({
  awsId: AWS_ID,
  awsSecret: AWS_SECRET,
  awsTag: AWS_TAG
})

async function getEvaluationPrice (isbn) {
  const formattedIsbn = isbn.replace(/-/, '')
  try {
    const salesRankInfo = await client.itemLookup({
      idType: 'ISBN',
      itemId: formattedIsbn,
      ResponseGroup: 'SalesRank,Offers,ItemAttributes'
    })
    return salesRankInfo
  } catch (err) {
    console.log('ERROR', err.Error)
    return { msg: err.Error }
  }
}

module.exports = { getEvaluationPrice }

const { footer, htmlHead, tableHeader } = require('./orderEmailTemplateContants');

const createOrderTemplate = (order, items, shippingAddress, headlineText) => {
  const itemsTable = createItemsTable(order, items)
  const header = createHeader(order, shippingAddress, headlineText)

  return `
    <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN'
      'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <html xmlns='http://www.w3.org/1999/xhtml'>
    ${htmlHead}
      <body bgcolor='#f7f7f7'>
      <table align='center' cellpadding='0' cellspacing='0' class='container-for-gmail-android' width='100%'>
        ${header}
        <tr>
          <td align='center' valign='top' width='100%'
              style='background-color: #ffffff;  border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;'>
            ${itemsTable}
          </td>
        </tr>
        ${footer}
      </table>
      </div>
      </body>
    </html>
`
}

const createItemsTable = (order, items) => {
  // FIXME: a order nao esta vindo com informacoes sobre total
  const orderPricingInfo = createOrderPricingInfo(
    order.prices && order.prices.total
  )
  const itemsTableRows = items
    .map(({ title, price, imageUrl, subTitle }) =>
      createItemsTableRows(title, price, imageUrl, subTitle)
    )
    .join('')

  return `
    <center>
      <table cellpadding='0' cellspacing='0' width='600' class='w320'>
        <tr>
          <td class='item-table'>
            <table cellspacing='0' cellpadding='0' width='100%'>
              ${tableHeader}
              ${itemsTableRows}
              <tr>
                <td class='item-col item mobile-row-padding'></td>
                <td class='item-col quantity'></td>
                <td class='item-col price'></td>
              </tr>
              ${orderPricingInfo}
            </table>
          </td>
        </tr>
      </table>
    </center>
`
}

const createItemsTableRows = (title, price, imageUrl, subTitle) => {
  return `
    <tr>
      <td class='item-col item'>
        <table cellspacing='0' cellpadding='0' width='100%'>
          <tr>
            <td class='mobile-hide-img'>
              <a href=''><img width='110' height='92' src='${imageUrl}' alt='item1'></a>
            </td>
            <td class='product'>
              <span style='color: #4d4d4d; font-weight:bold;'>${title}</span> <br/>
              ${subTitle}
            </td>
          </tr>
        </table>
      </td>
      <td class='item-col quantity'></td>
      <td class='item-col'>
        $ ${price}
      </td>
    </tr>
`
}

const createOrderPricingInfo = total => {
  return total
    ? `
    <tr>
      <td class='item-col item'>
      </td>
      <td class='item-col quantity' style='text-align:right; padding-right: 10px; border-top: 1px solid #cccccc;'>
        <span class='total-space' style='font-weight: bold; color: #4d4d4d'>Total</span>
      </td>
      <td class='item-col price' style='text-align: left; border-top: 1px solid #cccccc;'>
        <span class='total-space' style='font-weight:bold; color: #4d4d4d'>${total}</span>
      </td>
    </tr>  
`
    : ''
}

const createHeader = (order, shippingAddress, headlineText) => {
  const address = createShippingAddress(shippingAddress)
  const orderInfo = createOrderInfos(
    order.id,
    new Date(order.createdAt),
    new Date(order.updatedAt)
  )

  return `
    <tr>
      <td align='center' valign='top' width='100%' style='background-color: #f7f7f7;' class='content-padding'>
        <center>
          <table cellspacing='0' cellpadding='0' width='600' class='w320'>
            <tr>
              <td class='header-lg'>
                Thank you for your order!
              </td>
            </tr>
            <tr>
              <td class='free-text'>
                ${headlineText}
              </td>
            </tr>
            <tr>
              <td class='w320'>
                <table cellpadding='0' cellspacing='0' width='100%'>
                  <tr>
                    ${address}
                    ${orderInfo}
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </center>
      </td>
    </tr>
`
}

const createShippingAddress = ({ street, city, zipCode, state }) => {
  return `
    <td class='mini-container-left'>
      <table cellpadding='0' cellspacing='0' width='100%'>
        <tr>
          <td class='mini-block-padding'>
            <table cellspacing='0' cellpadding='0' width='100%'
                   style='border-collapse:separate !important;'>
              <tr>
                <td class='mini-block'>
                  <span class='header-sm'>Shipping Address</span><br/>
                  ${street} <br/>
                  ${city} <br/>
                  ${zipCode} <br/>
                  ${state} <br/>
                  <br />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
`
}

const createOrderInfos = (orderId, orderDate) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const locale = 'en-US'
  return `
    <td class='mini-container-right'>
      <table cellpadding='0' cellspacing='0' width='100%'>
        <tr>
          <td class='mini-block-padding'>
            <table cellspacing='0' cellpadding='0' width='100%'
                   style='border-collapse:separate !important;'>
              <tr>
                <td class='mini-block'>
                  <span class='header-sm'>Date Ordered</span><br/>
                  ${orderDate.toLocaleDateString(locale, options)}<br/>
                  <br/>
                  <span class='header-sm'>Order</span> <br/>
                  #${orderId}<br/>
                  Payment waiting for approval
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
`
}

module.exports = {
  createOrderTemplate
}

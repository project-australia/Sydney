export const newOrderResponse = {
  updatedAt: '2018-02-10T13:03:21.419Z',
  createdAt: '2018-02-10T13:03:21.419Z',
  orderType: 'DONATE',
  shippingMethod: 'SHIPPED',
  customerId: 'X13v1lep1PTaKKHjZYkZFXbYQHn2',
  shippingAddress: {
    city: 'viana',
    street: 'fighter',
    zipCode: 'zip',
    state: 'es'
  },
  items: ['5a7a2f563b29000014678917'],
  status: 'WAITING_PAYMENT',
  id: '5a7eed99599f0a1effc47e7b'
}

export const newSellingOrderRequest = {
  "orderType": "SELL",
  "shippingMethod": "IN_PERSON",
  "shippingAddress": {
    "street": "Street Do Povao 25",
    "city": "Vix",
    "zipCode": "170700",
    "state": "Es"
  },
  "items": [
    {
      "type": "SELL",
      "id": "2018-03-24T11:05:38.622Z",
      "book": {
        "id": "2018-03-24T14:17:05.720Z",
        "condition": "New",
        "title": "Student Solutions Manual for Stewarts Single Variable Calculus: Early Transcendentals, 8th (James Stewart Calculus)",
        "authors": [
          "James Stewart",
          "Jeffrey A. Cole",
          "Daniel Drucker",
          "Daniel Anderson"
        ],
        "edition": "8",
        "isbn": "1305272420",
        "images": {
          "small": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL._SL75_.jpg",
          "medium": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL._SL160_.jpg",
          "large": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL.jpg"
        },
        "dimensions": {
          "height": 1.1,
          "length": 9.9,
          "width": 8,
          "weight": 1.65
        },
        "prices": {
          "sell": 26.02
        }
      }
    }
  ]
}

export const newRentingOrderRequest = {
  "orderType": "BUY",
  "shippingMethod": "IN_PERSON",
  "shippingAddress": {
    "street": "Street Do Povao 25",
    "city": "Vix",
    "zipCode": "170700",
    "state": "Es"
  },
  "items": [
    {
      "type": "RENT",
      "id": "5ab65fc226aec5309884d094",
      "book": {
        "id": "5ab65fc226aec5309884d094",
        "condition": "New",
        "title": "Student Solutions Manual for Stewarts Single Variable Calculus: Early Transcendentals, 8th (James Stewart Calculus)",
        "authors": [
          "James Stewart",
          "Jeffrey A. Cole",
          "Daniel Drucker",
          "Daniel Anderson"
        ],
        "edition": "8",
        "isbn": "1305272420",
        "images": {
          "small": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL._SL75_.jpg",
          "medium": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL._SL160_.jpg",
          "large": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL.jpg"
        },
        "dimensions": {
          "height": 1.1,
          "length": 9.9,
          "width": 8,
          "weight": 1.65
        },
        "prices": {
          "sell": 26.02
        }
      }
    }
  ]
}


export const newBuyingOrderRequest = {
  orderType: 'BUY',
  items: [{
    "type": "SELL",
    "id": "2018-03-24T11:05:38.622Z",
    "book": {
      "id": "2018-03-24T14:17:05.720Z",
      "condition": "New",
      "title": "Student Solutions Manual for Stewarts Single Variable Calculus: Early Transcendentals, 8th (James Stewart Calculus)",
      "authors": [
        "James Stewart",
        "Jeffrey A. Cole",
        "Daniel Drucker",
        "Daniel Anderson"
      ],
      "edition": "8",
      "isbn": "1305272420",
      "images": {
        "small": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL._SL75_.jpg",
        "medium": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL._SL160_.jpg",
        "large": "https://images-na.ssl-images-amazon.com/images/I/51BUXoQVslL.jpg"
      },
      "dimensions": {
        "height": 1.1,
        "length": 9.9,
        "width": 8,
        "weight": 1.65
      },
      "prices": {
        "sell": 26.02
      }
    }
  }
  ],
  shippingMethod: 'IN_PERSON',
  shippingAddress: {
    city: 'Viana',
    street: 'fighter',
    number: '666',
    zipCode: 'Zip',
    state: 'ES'
  }
}

export const updateOrderStatusRequest = {
  status: 'PAYMENT_CONFIRMED',
  transactionId: 'ID'
}

export const orderUpdatedResponse = {
  updatedAt: '2018-02-10T13:03:21.419Z',
  createdAt: '2018-02-10T13:03:21.419Z',
  orderType: 'DONATE',
  shippingMethod: 'SHIPPED',
  customerId: 'X13v1lep1PTaKKHjZYkZFXbYQHn2',
  shippingAddress: {
    city: 'viana',
    street: 'fighter',
    number: '666',
    zipCode: 'zip',
    state: 'es'
  },
  items: ['5a7a2f563b29000014678917'],
  status: 'PAYMENT_CONFIRMED',
  id: '5a7eed99599f0a1effc47e7b'
}

const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    address: Address
    cart: Cart
  }
  
  type Address {
    street: String
    city: String
    state: String
    zip: String
  }
  
  type Cart {
    _id: ID!
    items: [CartItem]
    total: Float
    createdAt: String
  }

  type CartItem {
    productId: ID!
    quantity: Int!
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    image: String
    weight: Float
    category: Category
  }
  
  type Category {
    _id: ID!
    name: String!
  }

  type Checkout {
    session: ID
  }
  
  type Query {
    me: User
    getCart(_id: ID!): Cart
    getProducts(categoryId: ID!): [Product]
    getProduct(_id: ID!): Product
    getCategories: [Category]
    getCheckout(cartId: ID!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    updateAddress(street: String, city: String, state: String, zip: String): User
    syncCart(cartId: ID!): User
    newCart: Cart
    addItemToCart(_id: ID!, productId: ID!, quantity: Int): Cart
    removeItemFromCart(_id: ID!, productId: ID!): Cart
    updateCartItem(_id: ID!, productId: ID!, quantity: Int!): Cart
    removeCart(cartId: ID!): RemoveCartResponse
  }

  type Auth {
    token: ID!
    user: User
  }

  type RemoveCartResponse {
    success: Boolean!
    message: String
  }
`
module.exports = typeDefs;
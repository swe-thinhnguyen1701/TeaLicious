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
    userId: ID
    items: [CartItem]
    total: Float
    createdAt: String
  }

  type CartItem {
    productId: Product
    quantity: Int
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
  
  type Query {
    me: User
    getCart(_id: ID!): Cart
    getProducts(categoryId: ID!): [Product]
    getProduct(_id: ID!): Product
    getCategories: [Category]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    updateAddress(street: String, city: String, state: String, zip: String): User
    syncCart(cartId: ID!): User
    newCart: Cart
    addItemToCart(_id: ID!, productId: ID!, quantity: Int): Cart
    removeItemFromCart(productId: ID!): Cart
    updateCartItem(productId: ID!, quantity: Int!): Cart
  }

  type Auth {
    token: ID!
    user: User
  }
`
module.exports = typeDefs;
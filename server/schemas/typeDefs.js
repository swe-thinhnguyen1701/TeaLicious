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
    productId: ID!
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
    getProducts(category: String, categoryId: ID): [Product]
    getProduct(_id: ID!): Product
    getCategories: [Category]
    getCategory(_id: ID!): Category
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(username: String, email: String, password: String!): User
    updateAddress(street: String, city: String, state: String, zip: String): User
    addToCart(productId: ID!, quantity: Int): Cart
    removeFromCart(productId: ID!): Cart
    updateCartItem(productId: ID!, quantity: Int!): Cart
    newCart(userId: ID): Cart
  }
`
module.exports = typeDefs;
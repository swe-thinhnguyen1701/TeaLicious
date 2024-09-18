/**
 * GraphQL Schema Definitions for the application.
 * 
 * This file defines the types, queries, and mutations for the GraphQL API.
 * 
 * @module typeDefs
 * 
 * @description
 * - **User**: Represents a user in the system with their personal details and related entities like address and cart.
 * - **Address**: Represents the address of a user.
 * - **Cart**: Represents a shopping cart associated with a user, including items and total amount.
 * - **CartItem**: Represents an individual item in a cart with product ID and quantity.
 * - **Product**: Represents a product available in the store.
 * - **Category**: Represents a product category.
 * - **Checkout**: Represents a checkout session for a cart.
 * - **Query**: Defines read operations to fetch data from the server.
 * - **Mutation**: Defines write operations to modify data on the server.
 * - **Auth**: Represents authentication response containing a token and user details.
 * - **RemoveCartResponse**: Response type for cart removal operation.
 * 
 * @typedef {Object} User
 * @property {ID} _id - Unique identifier for the user.
 * @property {String} username - Username of the user.
 * @property {String} email - Email address of the user.
 * @property {String} password - Password of the user.
 * @property {Address} address - Address details of the user.
 * @property {Cart} cart - Cart associated with the user.
 * 
 * @typedef {Object} Address
 * @property {String} street - Street address.
 * @property {String} city - City.
 * @property {String} state - State.
 * @property {String} zip - Zip code.
 * 
 * @typedef {Object} Cart
 * @property {ID} _id - Unique identifier for the cart.
 * @property {CartItem[]} items - List of items in the cart.
 * @property {Float} total - Total amount of the cart.
 * @property {String} createdAt - Timestamp when the cart was created.
 * 
 * @typedef {Object} CartItem
 * @property {ID} productId - Unique identifier for the product.
 * @property {Int} quantity - Quantity of the product in the cart.
 * 
 * @typedef {Object} Product
 * @property {ID} _id - Unique identifier for the product.
 * @property {String} name - Name of the product.
 * @property {String} description - Description of the product.
 * @property {Float} price - Price of the product.
 * @property {Int} stock - Stock quantity of the product.
 * @property {String} [image] - URL to the product image.
 * @property {Float} [weight] - Weight of the product.
 * @property {Category} [category] - Category of the product.
 * 
 * @typedef {Object} Category
 * @property {ID} _id - Unique identifier for the category.
 * @property {String} name - Name of the category.
 * 
 * @typedef {Object} Checkout
 * @property {ID} session - ID of the checkout session.
 * 
 * @typedef {Object} Auth
 * @property {ID} token - Authentication token for the user.
 * @property {User} [user] - User object if authentication is successful.
 * 
 * @typedef {Object} RemoveCartResponse
 * @property {Boolean} success - Indicates if the cart removal was successful.
 * @property {String} [message] - Optional message providing additional details.
 */

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
    getCart(_id: ID): Cart
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
    cartId: String
  }
`
module.exports = typeDefs;
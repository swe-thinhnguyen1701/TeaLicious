const typeDefs = `
type User {
    id: ID!
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
    id: ID!
   
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    image: String
    weight: Float
    category: Category
  }
  
  type Category {
    id: ID!
    name: String!
  }
    
  `
  module.exports = typeDefs;
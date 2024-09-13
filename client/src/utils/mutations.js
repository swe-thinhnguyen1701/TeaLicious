import {gql} from '@apollo/client';


export const ADD_USER = gql`
  mutation addUser ($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const LOGIN = gql`
  mutation login($identifier: String!, $password: String!) {
    login(username: $identifier, email: $identifier, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const UPDATE_ADDRESS = gql`
  mutation updateAddress($street: String!, $city: String!, $state: String!, $zip: String!) {
    updateAddress(street: $street, city: $city, state: $state, zip: $zip) {
      _id
      username
      email
      address {
        street
        city
        state
        zip
      }
    }
  }
`;


export const NEW_CART = gql`
  mutation newCart {
    newCart {
      _id
      items {
        productId
        quantity
      }
      total
    }
  }
`;


export const ADD_ITEM_TO_CART = gql`
  mutation addItemToCart ($_id: ID!, $productId: ID!, $quantity: Int!) {
    addItemToCart(_id: $_id, productId: $productId, quantity: $quantity) {
      _id
      items {
        productId
        quantity
      }
    }
  }
`;


export const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItemFromCart($_id: ID!,$productId: ID!) {
    removeItemFromCart(_id: $_id, productId: $productId) {
      _id
      items {
        productId
        quantity
      }
    }
  }
`;


export const UPDATE_CART_ITEM = gql`
  mutation updateCartItem($productId: ID!, $quantity: Int!) {
    updateCartItem(productId: $productId, quantity: $quantity) {
      _id
      items {
        productId {
          _id
          name
          description
          price
        }
        quantity
      }
    }
  }
`;

export const SYNC_CART = gql`
  mutation syncCart($cartId: ID!){
    syncCart(cartId: $cartId) {
      _id
      cart {
        _id
      }
    }
  }
`
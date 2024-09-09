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
  mutation login($username: String!, $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
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
  mutation newCart{
    newCart {
      cart {
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
      user {
        _id
        username
        email
        cart {
          _id
        }
      }
    }
  }
`;


export const ADD_ITEM_TO_CART = gql`
  mutation addItemToCart ($productId: ID!, $quantity: Int!) {
    addItemToCart(productId: $productId, quantity: $quantity) {
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


export const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItemFromCart($productId: ID!) {
    removeItemFromCart(productId: $productId) {
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





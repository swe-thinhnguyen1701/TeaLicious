import {gql} from '@apollo/client';

export const GET_ME = gql`
  query Query{
    me {
      _id
      username
      email
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
    }
  }
`;

export const GET_CART = gql`
  query getCart($_id: ID!) {
    getCart(_id: $_id) {
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


export const GET_PRODUCTS = gql`
  query getProducts($categoryId: ID!) {
    getProducts(categoryId: $categoryId) {
      _id
      name
      description
      price
      category {
        _id
        name
      }
    }
  }
`;


export const GET_PRODUCT = gql`
  query getProducts($_id: ID!) {
    getProduct(_id: $_id) {
      _id
      name
      description
      price
      category {
        _id
        name
      }
    }
  }
`;


export const GET_CATEGORIES = gql`
  query getCategories{
    getCategories {
      _id
      name
    }
  }
`;

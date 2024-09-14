import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me{
    me {
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

export const GET_CART = gql`
  query getCart($_id: ID!) {
    getCart(_id: $_id) {
      _id
      items {
        productId
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
      image
      category {
        _id
        name
      }
    }
  }
`;


export const GET_PRODUCT = gql`
  query getProduct($_id: ID!) {
    getProduct(_id: $_id) {
      _id
      name
      description
      price
      stock
      image
      weight
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

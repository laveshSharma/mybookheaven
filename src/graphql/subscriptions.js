/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBookOrder = /* GraphQL */ `
  subscription OnCreateBookOrder(
    $filter: ModelSubscriptionBookOrderFilterInput
    $customer: String
  ) {
    onCreateBookOrder(filter: $filter, customer: $customer) {
      id
      book_id
      order_id
      customer
      createdAt
      updatedAt
      book {
        id
        title
        description
        image
        author
        featured
        price
        createdAt
        updatedAt
        __typename
      }
      order {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      bookOrdersId
      orderBooksId
      __typename
    }
  }
`;
export const onUpdateBookOrder = /* GraphQL */ `
  subscription OnUpdateBookOrder(
    $filter: ModelSubscriptionBookOrderFilterInput
    $customer: String
  ) {
    onUpdateBookOrder(filter: $filter, customer: $customer) {
      id
      book_id
      order_id
      customer
      createdAt
      updatedAt
      book {
        id
        title
        description
        image
        author
        featured
        price
        createdAt
        updatedAt
        __typename
      }
      order {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      bookOrdersId
      orderBooksId
      __typename
    }
  }
`;
export const onDeleteBookOrder = /* GraphQL */ `
  subscription OnDeleteBookOrder(
    $filter: ModelSubscriptionBookOrderFilterInput
    $customer: String
  ) {
    onDeleteBookOrder(filter: $filter, customer: $customer) {
      id
      book_id
      order_id
      customer
      createdAt
      updatedAt
      book {
        id
        title
        description
        image
        author
        featured
        price
        createdAt
        updatedAt
        __typename
      }
      order {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      bookOrdersId
      orderBooksId
      __typename
    }
  }
`;

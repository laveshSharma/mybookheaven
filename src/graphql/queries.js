/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBookOrder = /* GraphQL */ `
  query GetBookOrder($id: ID!) {
    getBookOrder(id: $id) {
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
export const listBookOrders = /* GraphQL */ `
  query ListBookOrders(
    $filter: ModelBookOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        book_id
        order_id
        customer
        createdAt
        updatedAt
        bookOrdersId
        orderBooksId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      user
      date
      total
      books {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      customer
      __typename
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listBookOrdersByBook = /* GraphQL */ `
  query ListBookOrdersByBook(
    $book_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBookOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookOrdersByBook(
      book_id: $book_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        book_id
        order_id
        customer
        createdAt
        updatedAt
        bookOrdersId
        orderBooksId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listBookOrdersByOrder = /* GraphQL */ `
  query ListBookOrdersByOrder(
    $order_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBookOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookOrdersByOrder(
      order_id: $order_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        book_id
        order_id
        customer
        createdAt
        updatedAt
        bookOrdersId
        orderBooksId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByUser = /* GraphQL */ `
  query OrdersByUser(
    $user: String!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByUser(
      user: $user
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      description
      image
      author
      featured
      price
      orders {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;

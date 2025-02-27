const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const ORDER_TABLE = "Order-y7ho6gcwrbcapdb4t6vkkesyna-dev";
const ORDER_TYPE = "Order";
const BOOK_ORDER_TABLE = "BookOrder-y7ho6gcwrbcapdb4t6vkkesyna-dev";
const BOOK_ORDER_TYPE = "BookOrder";

// Function to create an order in the database
const createOrder = async (payload) => {
  const { order_id, username, email, total } = payload;
  const params = {
    TableName: ORDER_TABLE,
    Item: {
      id: order_id,
      __typename: ORDER_TYPE,
      customer: email,
      user: username,
      total: total,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
  console.log("Creating order:", params);
  await documentClient.put(params).promise();
};

// Function to link books to an order
const createBookOrder = async (payload) => {
  let bookOrders = payload.cart.map((cartItem) => ({
    PutRequest: {
      Item: {
        id: uuidv4(),
        __typename: BOOK_ORDER_TYPE,
        book_id: cartItem.id,
        order_id: payload.order_id,
        customer: payload.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }));

  const params = {
    RequestItems: {
      [BOOK_ORDER_TABLE]: bookOrders
    }
  };
  console.log("Linking books to order:", params);
  await documentClient.batchWrite(params).promise();
};

/*
 * Handles order creation after payment processing
 * 1. Retrieves order details from the previous Lambda function
 * 2. Creates an order entry in DynamoDB
 * 3. Links books to the order for tracking
 * 4. (Future) Send invoice email to the customer
 */
exports.handler = async (event) => {
  try {
    let payload = event.prev.result;
    payload.order_id = uuidv4();

    // Create a new order in DynamoDB
    await createOrder(payload);

    // Link books to the order for reference
    await createBookOrder(payload);

    // TODO: Implement email invoice sending logic

    return "SUCCESS";
  } catch (err) {
    console.error("Error creating order:", err);
    throw new Error(err);
  }
};

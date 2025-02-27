const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const USER_POOL_ID = "ap-south-1_wvuXsjrrk";
const stripe = require("stripe")("sk_test_51Qvb9nG4cQOVMnxSFqFmnySZyVO9xQAcglVt5FMshZjUgsx0FeuBMsuME5ZR6XxFuIuOH6F3ZSv7x7l8uBFssdwc00mVTrx5W6");

// Function to retrieve user email from AWS Cognito
const getUserEmail = async (event) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.username
  };
  
  const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
  const emailAttr = user.UserAttributes.find((attr) => attr.Name === "email");
  return emailAttr ? emailAttr.Value : null;
};

/*
 * Handles payment processing via Stripe
 * 1. Retrieves order details from client input
 * 2. Fetches user's email from Cognito
 * 3. Charges the customer's card using Stripe
 * 4. Returns order details for further processing
 */
exports.handler = async (event) => {
  try {
    const { id, cart, total, address, token } = event.arguments.input;
    const { username } = event.identity.claims;
    
    // Retrieve the user's email from Cognito
    const email = await getUserEmail(event);
    if (!email) throw new Error("User email not found");
    
    // Process payment through Stripe
    await stripe.charges.create({
      amount: total * 100, // Convert to cents
      currency: "usd",
      source: token,
      description: `Order ${new Date().toISOString()} by ${email}`
    });
    
    return { id, cart, total, address, username, email };
  } catch (err) {
    console.error("Payment processing failed:", err);
    throw new Error("Payment processing error");
  }
};

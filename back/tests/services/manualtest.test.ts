const { getUser } = require("../../src/services/user.services.ts");

async function testGetUser() {
  // Test case 1: Successful data fetch (Assume there is a user with id 1)
  console.log("Running Test Case 1: Fetching a valid user.");
  const result1 = await getUser(1); // Replace with an existing user ID
  if (result1 && result1.id_user === 1) {
    console.log("Test case 1 passed: Successfully fetched user data:", result1);
  } else {
    console.error("Test case 1 failed. Result:", result1);
  }

  // Test case 2: User not found (Assume id 9999 does not exist)
  console.log("\nRunning Test Case 2: Fetching a non-existent user.");
  const result2 = await getUser(100);
  if (result2 === null) {
    console.log("Test case 2 passed: No user found.");
  } else {
    console.error("Test case 2 failed. Result:", result2);
  }

  // Test case 3: Error handling (Simulate by passing invalid input)
  console.log("\nRunning Test Case 3: Handling invalid input.");
  const result3 = await getUser(null); // Invalid ID to simulate an error
  if (result3 === null) {
    console.log("Test case 3 passed: Error handled correctly.");
  } else {
    console.error("Test case 3 failed. Result:", result3);
  }
}

testGetUser()
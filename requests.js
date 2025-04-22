//imports
require('dotenv').config();
const axios = require('axios');

//Auth
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const credentials = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

const headers = {
  'Authorization': `Basic ${credentials}`,
  'Content-Type': 'application/json'
};

const requestBody = {
  "name_first": "Jessica",
    "name_last": "Deny", //Test, Review, Deny
    "birth_date": "1990-01-01",
    "document_ssn": "123456789",
    "email_address": "jessica.review@example.com",
    "address_line_1": "123 Main St",
    "address_line_2": "Apt 4B",
    "address_city": "New York",
    "address_state": "NY",
    "address_postal_code": "10001",
    "address_country_code": "US"
  }; 

// Post evaluation
  async function postAlloy(data) {

    try {
     const response = await axios.post("https://sandbox.alloy.co/v1/evaluations", requestBody, { headers });
     processResponse(response.data);
   } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

// Interpret API Response
function processResponse(data) {

  const outcome = data?.summary?.outcome;
  console.log (outcome);

  switch (outcome) {
  case 'Approved':
    console.log('Congratulations! You are approved.');
    break;
  case 'Manual Review':
    console.log('Your application is under review. Please wait for further updates.');
    break;
  case 'Deny':
    console.log('Unfortunately, we cannot approve your application at this time.');
    break;
  default:
    console.log('Unexpected outcome:', outcome);
  }
}

// Run script
postAlloy(requestBody);

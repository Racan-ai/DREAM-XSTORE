// shiprocket_helper.js

const axios = require('axios');

const SHIPROCKET_API_BASE = 'https://apiv2.shiprocket.in/v1/external';

let token = null;

/**
 * Authenticate and retrieve the API token.
 * @param {string} email - Shiprocket API user email.
 * @param {string} password - Shiprocket API user password.
 * @returns {Promise<string>} - Authentication token.
 */
async function authenticate(email, password) {
  try {
    const response = await axios.post(`${SHIPROCKET_API_BASE}/auth/login`, {
      email,
      password,
    });
    token = response.data.token;
    return token;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Add a new pickup location.
 * @param {Object} locationData - Details of the pickup location.
 * @returns {Promise<Object>} - API response.
 */
async function addPickupLocation(locationData) {
  // locationData = {
  //   "pickup_location": "Home",
  //   "name": "Deadpool",
  //   "email": "deadpool@chimichanga.com",
  //   "phone": "9777777779",
  //   "address": "Mutant Facility, Sector 3 ",
  //   "address_2": "",
  //   "city": "Pune",
  //   "state": "Maharshtra",
  //   "country": "India",
  //   "pin_code": "110022"
  // }
  try {
    const response = await axios.post(
      `${SHIPROCKET_API_BASE}/settings/company/addpickup`,
      locationData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Add Pickup Location failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Get delivery price between pickup and delivery pincodes.
 * @param {Object} params - Parameters including pickup_postcode, delivery_postcode, weight, etc.
 * @returns {Promise<Object>} - API response.
 */
async function getDeliveryPrice(params) {
  // params = {
	// "pickup_postcode":695615,
	// "delivery_postcode":560066,
	// "cod":false,
	// "weight":"0.500"
	
  // }

  console.log(params)
  console.log(token)
  try {
    const response = await axios.get(
      `${SHIPROCKET_API_BASE}/courier/serviceability/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
         params: params,
      }
    );

  const companies = response.data?.data?.available_courier_companies;
  
  if (!companies || companies.length === 0) {
    throw new Error("No courier options available.");
  }

  const cheapest = companies[0]; // assumed to be sorted by price

  return {
    courier_name: cheapest.courier_name,
    estimated_delivery_days: cheapest.estimated_delivery_days,
    estimated_delivery_date: cheapest.etd,
    delivery_cost: cheapest.rate,
  };
  } catch (error) {
    throw new Error(`Get Delivery Price failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Create a new order.
 * @param {Object} orderData - Details of the order.
 * @returns {Promise<Object>} - API response.
 */
async function createOrder(orderData) {
//  {
//  order_id: req.body.razorpay_order_id,
//             order_date: new Date().toISOString().split('T')[0], // todays date 
//             pickup_location: booking.pickup_location,
//             billing_customer_name: booking.billing_customer_name,
//             billing_last_name: booking.billing_customer_name,
//             billing_address: booking.billing_address,
//             billing_city: booking.billing_city,
//             billing_pincode: booking.billing_pincode,
//             billing_state: booking.billing_state,
//             billing_country: booking.billing_country,
//             billing_email: booking.billing_email,
//             billing_phone: booking.billing_phone,
//             shipping_is_billing: true,
//             order_items: booking.items.map(item => ({
//               name: item.title,
//               sku: item.title,
//               units: item.quantity,
//               selling_price: item.price
//             })),
//             payment_method: "Prepaid",
//             sub_total: booking.subtotal,
//             length: 60, //in cm
//             breadth: 30,
//             height: 5,
//             weight: 0.300 // in kg 
//           }

  try {
    const response = await axios.post(
      `${SHIPROCKET_API_BASE}/orders/create/adhoc`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Create Order failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Request pickup for a shipment.
 * @param {number} shipmentId - ID of the shipment.
 * @returns {Promise<Object>} - API response.
 */
async function requestPickup(shipmentId) {
  try {
    const response = await axios.post(
      `${SHIPROCKET_API_BASE}/courier/generate/pickup`,
      { shipment_id: shipmentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Request Pickup failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Get tracking details using shipment ID.
 * @param {number} shipmentId - ID of the shipment.
 * @returns {Promise<Object>} - API response.
 */
async function getTrackingDetails(shipmentId) {
  try {
    const response = await axios.get(
      `${SHIPROCKET_API_BASE}/courier/track/shipment/${shipmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Get Tracking Details failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Get tracking details using shipment ID.
 * @param {number} shipmentId - ID of the shipment.
 * @returns {Promise<Object>} - API response.
 */
async function getAWBNumber(shipmentId) {
  try {
    const response = await axios.post(
      `${SHIPROCKET_API_BASE}/courier/assign/awb`,
       { shipment_id: shipmentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Get Tracking Details failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Get all orders.
 * @returns {Promise<Object>} - API response.
 */
async function getAllOrders() {
  try {
    const response = await axios.get(
      `${SHIPROCKET_API_BASE}/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Get All Orders failed: ${error.response?.data?.message || error.message}`);
  }
}

function checktoken(){
  return token
}

module.exports = {
  authenticate,
  addPickupLocation,
  getDeliveryPrice,
  createOrder,
  requestPickup,
  getTrackingDetails,
  getAllOrders,
  checktoken,
  getAWBNumber
};

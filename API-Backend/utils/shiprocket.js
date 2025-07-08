const axios = require('axios');

let cachedToken = null;

async function getShiprocketToken() {
    if (cachedToken) return cachedToken;

    const res = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD
    });

    cachedToken = res.data.token;
    return cachedToken;
}

async function createShiprocketOrder(orderData) {
    try {
        const token = await getShiprocketToken();

        const res = await axios.post(
            'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('Shiprocket Order Response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Shiprocket API Error:', error?.response?.data || error.message);
        throw error;
    }
}

module.exports = { getShiprocketToken, createShiprocketOrder };

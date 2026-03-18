const paypal = require("paypal-rest-sdk");

try {
    if (!process.env.PAYPAL_MODE || !process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        console.warn("⚠️  PayPal credentials not found in .env — PayPal payments will not work.");
    } else {
        paypal.configure({
            mode: process.env.PAYPAL_MODE,
            client_id: process.env.PAYPAL_CLIENT_ID,
            client_secret: process.env.PAYPAL_CLIENT_SECRET,
        });
        console.log("✅ PayPal configured successfully.");
    }
} catch (error) {
    console.error("❌ Failed to configure PayPal:", error.message);
}

module.exports = paypal;
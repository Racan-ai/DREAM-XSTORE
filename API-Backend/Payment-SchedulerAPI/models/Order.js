const {Schema,mongoose} = require('mongoose');

const OrderSchema = new mongoose.Schema({
    User: {
        type: Schema.Types.ObjectId, 
    },
    vendor : {
        type: Schema.Types.ObjectId
    },
    address: { type: String, required: true },
    items: [
        {
            title: String,
            category: String,
            size : String,
            price: Number,
            quantity: Number,
        },
    ],
    subtotal: Number,
    tax: Number,
    shipping: Number,
    total: Number,
    billing_customer_name: String,
    billing_address: String,
    billing_city: String,
    billing_pincode: String,
    billing_state: String,
    billing_country: String,
    billing_email: String,
    billing_phone: String,
    status: { type: String, default: 'Pending' },
    paymentid : {type: String,default : ""},
     shipment_id : {type:String,default : ""},
    pickup_location: {
      type:String,
      default : ""
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);

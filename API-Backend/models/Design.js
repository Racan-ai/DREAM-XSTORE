const { Schema, model } = require('mongoose');

const designSchema = new Schema({
    title: { type: String, required: true }, // Design title
    description: { type: String }, // Optional description of the design
    designer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true // Reference to the User who created the design
    },
    sizes: {
      type: [String],
      default: []
    },
    brand_upload:{ 
      type: Boolean,
      default : false
    },
    colabs: {
      type: String,
      default : "",
    },
    pickup_location: {
      type:String,
      default : ""
    },
    pincode : {
      type : Number,
      default : 0
    },
    price: { type: Number, required: true }, // Price of the design
    discount : {type:Number},
    category: { type: String, required: true }, // Category for the design
    images: [String], // Paths to images (back and front views)
    image_1: {type: String, default : ''},
    image_2: {type: String, default : ''},
    image_3: {type: String, default : ''},
    image_4: {type: String, default : ''},
    isPublic: { type: Boolean, default: true }, // Public visibility status
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' }, // User giving the rating
        rating: { type: Number }, // Rating value
        review: { type: String }, // Optional review text
        date: { type: Date, default: Date.now } // Timestamp of the rating
      }
    ],
},
{
    timestamps: true
});

const Design = model("Designs",designSchema);
module.exports = Design;
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true // Sender of the message
    },
    receiver: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true // Receiver of the message
    },
    content: { type: String, required: true }, // Message content
    attachments: [String], // Optional attachments (e.g., files, images)
    read: { type: Boolean, default: false }, // Read status of the message
},
{
    timestamps: true
});

const message = mongoose.model("Messages",messageSchema);
module.exports = message;
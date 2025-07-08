const mongoose = require('mongoose');

const hireRequestSchema = new mongoose.Schema({
    client: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true // Client who sent the hire request
    },
    designer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true // Designer receiving the request
    },
    projectRequirements: {
      title: { type: String }, // Project title
      description: { type: String }, // Project description
      budget: { type: Number }, // Budget for the project
      timeline: { type: String }, // Project timeline
      attachments: [String] // Optional attachments (e.g., files, images)
    },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'declined', 'completed'], 
      default: 'pending' // Request status
    },
},
{
    timestamps: true
});

const hireRequest = mongoose.model("HireRequest",hireRequestSchema);
module.exports = hireRequest;
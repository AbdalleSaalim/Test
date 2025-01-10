const mongoose = require("mongoose");

// Define the schema for cart items
const cartSchema = new mongoose.Schema(
  {
    // The name of the item, required field
    name: {
      type: String,
      required: true,
    },
    // The price of the item, required field
    price: {
      type: Number,
      required: true,
    },
    // The quantity of the item, required field
    quantity: {
      type: Number,
      required: true,
    },
    // The ID of the user who added the item, required field
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  // Automatically add createdAt and updatedAt fields
  { timestamps: true }
);

// Export the Cart model based on the cartSchema
module.exports = mongoose.model("Cart", cartSchema);

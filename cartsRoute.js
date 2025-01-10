const express = require("express");

// Import the controller
const {
  addItemToCart,
  getCartItems,
  getSingleCartItem,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

// Import the middleware
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Auth Middleware
router.use(requireAuth);

// Define routes
router.post("/add", addItemToCart); // Route to add a new item to the cart
router.get("/", getCartItems); // Route to get all cart items
router.get("/:id", getSingleCartItem); // Route to get a single cart item by ID
router.put("/update/:id", updateCartItem); // Route to update a cart item by ID
router.delete("/remove/:id", removeCartItem); // Route to remove a cart item by ID

// Export the router
module.exports = router;

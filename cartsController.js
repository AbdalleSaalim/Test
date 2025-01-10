const Cart = require("../model/cartModel");
const User = require("../model/userModel");

// Add an item to the cart
const addItemToCart = async (req, res) => {
  const { name, price, quantity } = req.body;
  const { _id } = req.user;

  // Input validation
  if (!name || !price || !quantity) {
    return res.status(400).json({ error: "Name, price, and quantity are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add item to the cart
    const cartItem = new Cart({
      name: name,
      price: price,
      quantity: quantity,
      createdBy: _id,
    });

    await cartItem.save();

    res.status(201).json({ message: "Item added to cart successfully", cartItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all items in the cart
const getCartItems = async (req, res) => {
  const { _id } = req.user;
  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = await Cart.find({ createdBy: _id });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single cart item by ID
const getSingleCartItem = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  // Input validation
  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = await Cart.findOne({ _id: id, createdBy: _id });

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit a cart item
const editCartItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  const { _id } = req.user;

  // Input validation
  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }
  if (!name || !price || !quantity) {
    return res.status(400).json({ error: "Name, price, and quantity are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Edit the cart item
    const cartItem = await Cart.findOneAndUpdate(
      { _id: id, createdBy: _id },
      { name: name, price: price, quantity: quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a cart item
const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  // Input validation
  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the cart item
    const cartItem = await Cart.findOneAndDelete({ _id: id, createdBy: _id });

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    res.status(200).json({ message: "Item deleted from cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addItemToCart,
  getCartItems,
  getSingleCartItem,
  editCartItem,
  deleteCartItem,
};

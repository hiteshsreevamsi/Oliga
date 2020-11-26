const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Order = require("../models/Order");

route.post(
  "/",
  [
    check("userId", "userId is required").not().isEmpty(),
    check("subTotal", "subTotal is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, subTotal } = req.body;
    try {
      order = new Order({
        userId,
        subTotal,
      });
      await order.save();
      res.json(order);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("internal server error");
    }
  }
);

route.get("/allOrders", async (req, res) => {
  try {
    let orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("internal server error");
  }
});

module.exports = route;

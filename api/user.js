const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const config = require("config");
const Order = require("../models/Order");

route.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    try {
      let user = await User.findOne({ name });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "user already exists with the same name" }],
        });
      }
      user = new User({
        name,
      });
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("internal server error");
    }
  }
);

route.get("/orders", async (req, res) => {
  let answer = [];
  try {
    let users = await User.find({});
    for (const user of users) {
      let orders = await Order.find({ userId: user.userId });
      let avg = 0;
      for (let i = 0; i < orders.length; i++) {
        avg += orders[i].subTotal;
      }
      avg /= orders.length;
      console.log(avg);
      console.log(orders);
      let userdata = {
        userId: user.userId,
        name: user.name,
        numberOfOrders: orders.length,
        averageBillValue: avg,
      };
      answer.push(userdata);
    }
    console.log(answer);
    res.json(answer);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("internal server error");
  }
});

route.put(
  "/update",
  [check("userId", "UserId is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.body;
    try {
      let orders = await Order.find({ userId });
      let data = { numberofOrders: orders.length };
      console.log(data);
      let user = await User.findOneAndUpdate({ userId: userId }, data);
      res.json({ success: true, message: "Successfully Updated" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("internal server error");
    }
  }
);
route.get("/allUsers", async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("internal server error");
  }
});
module.exports = route;

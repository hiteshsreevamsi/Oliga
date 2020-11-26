const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
  },

  userId: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
OrderSchema.plugin(AutoIncrement, {
  id: "orderId_sequ",
  inc_field: "orderId",
  start_seq: 1,
});
module.exports = User = mongoose.model("order", OrderSchema);

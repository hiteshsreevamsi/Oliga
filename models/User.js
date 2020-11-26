const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userId: {
      type: Number,
    },
  },
  { strict: false }
);
UserSchema.plugin(AutoIncrement, {
  id: "userId_sequ",
  inc_field: "userId",
  start_seq: 1,
});
module.exports = User = mongoose.model("user", UserSchema);

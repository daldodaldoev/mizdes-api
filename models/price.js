const mongoose = require("mongoose");
const { Schema } = mongoose;

const priceSchema = new Schema(
  {
    prices: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("price", priceSchema);

const { default: mongoose } = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      uppercase: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("expense", expenseSchema);

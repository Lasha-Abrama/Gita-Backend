const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        default: [],
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);

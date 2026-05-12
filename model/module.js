const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      index: true

    },
    name: {
      type: String,
      required: true,
      index: true

    },
    CusId: {
      type: String,
      default:"_",
      unique: true,
      index: true

    },
    CusPwd: {
      type: String,
      default:"_",
      index: true

    },
    nrc: {
      type: String,
      required: true,
      index: true

    },
    phone: {
      type: String,
      required: true,
      index: true

    },
    secondPhone: {
      type: String,
      index: true

    },
    address: {
      type: String,
      required: true,
      index: true

    },
    location: {
      lat: {
        type: Number,
        required: true,
        index: true

      },
      lng: {
        type: Number,
        required: true,
        index: true

      },
    },
    status: {
      type: String,
      default: "Pending",
      index: true

    },
    plan: {
      type: String,
      required: true,
      index: true

    },
    OrderDate: {
      type: Date,
      default: Date.now,
      index: true

    },
    requestDate: {
      type: Date,
      required: true,
      index: true

    },
    advanceMonth: {
      type: Number,
      required: true,
      index: true

    },
    promotion: {
      type: String,
      index: true

    },
    activeDate: {
      type: Date,
      index: true

    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🔥 helper function
function formatDate(date) {
  if (!date) return null;
  return date.toISOString().split("T")[0];
}

// ✅ virtuals
customerSchema.virtual("orderDateFormatted").get(function () {
  return formatDate(this.OrderDate);
});

customerSchema.virtual("requestDateFormatted").get(function () {
  return formatDate(this.requestDate);
});

customerSchema.virtual("activeDateFormatted").get(function () {
  return formatDate(this.activeDate);
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
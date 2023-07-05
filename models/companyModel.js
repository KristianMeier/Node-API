const mongoose = require('mongoose')

const companiesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a companies name'],
    },
    horse: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Companies = mongoose.model('Companies', companiesSchema)

module.exports = Companies

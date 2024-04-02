const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        streetNumber: {
          type: String,
          required: true,
        },
        streetName: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
      },
}
, { versionKey: false,
    timestamps: true}

);

clientSchema.statics.removeById = async function (clientId) {
    return this.deleteOne({ _id: clientId });
  };
  
module.exports = mongoose.model('Client', clientSchema);

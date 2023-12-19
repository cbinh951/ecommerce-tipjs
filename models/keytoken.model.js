const { Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop',
  },
  public: {
    type: String,
    required: true,
  },
  publicKey: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: Array,
    default: [],
  },
});

//Export the model
module.exports = mongoose.model('User', userSchema);

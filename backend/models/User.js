const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  paymentScreenshot: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  ticketDetails: { type: Object, default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
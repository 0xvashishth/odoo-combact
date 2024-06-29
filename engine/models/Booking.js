const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    furniture: { type: mongoose.Schema.Types.ObjectId, ref: 'Furniture', required: true },
    rentalDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    bookingDate: { type: Date, default: Date.now, required: true },
    status: { type: String, default: "pending" },
    paymentId: { type: String },
    paymentTime: { type: String },
});

module.exports = mongoose.model('Booking', BookingSchema);

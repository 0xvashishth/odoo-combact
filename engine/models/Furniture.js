const mongoose = require('mongoose');

const FurnitureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    rentalPrice: { type: Number, required: true }, // this would be per month rental Price
    availability: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    mainImageUrl: { type: String, required: true },
    imageUrls: { type: [String] },
    creationDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Furniture', FurnitureSchema);

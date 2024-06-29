const Booking = require("../models/Booking");

exports.bookFurniture = async (req, res) => {
  const { furnitureId, rentalDate, returnDate } = req.body;

  // Check if rentalDate and returnDate are valid and in the correct order
  const currentDate = new Date();
  const rentalDateObj = new Date(rentalDate);
  const returnDateObj = new Date(returnDate);

  if (rentalDateObj < currentDate || returnDateObj < currentDate) {
    return res
      .status(400)
      .json({ error: "Rental and return dates must be in the future." });
  }

  if (rentalDateObj >= returnDateObj) {
    return res
      .status(400)
      .json({ error: "Return date must be after the rental date." });
  }

  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();
  try {
    // Check if the furnitureId exists
    const furnitureExists = await Furniture.findById(furnitureId);
    if (!furnitureExists) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Furniture not found." });
    }

    const newBooking = new Booking({
      user: req.user.id,
      furniture: furnitureId,
      rentalDate: rentalDateObj,
      returnDate: returnDateObj,
      bookingDate: Date.now(),
      status: "pending",
    });
    const booking = await newBooking.save({ session }); // Include the session in the save operation
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    return res
      .status(201)
      .json({ message: "Booking created successfully", booking });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.log(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

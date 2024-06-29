const Furniture = require("../models/Furniture");
const Booking = require("../models/Booking");

exports.getFurniture = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;

    const furniture = await Furniture.find()
      .skip(startIndex)
      .limit(parseInt(limit));
    const totalCount = await Furniture.countDocuments();

    const pagination = {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      totalEntries: totalCount,
    };

    return res.status(200).json({
      message: "Furniture fetched successfully!",
      furniture,
      pagination,
    });
  } catch (err) {
      console.log(err.message)
      return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.addFurniture = async (req, res) => {
    const { name, description, rentalPrice, availability, createdBy, mainImageUrl, imageUrls } = req.body.furniture;
    const session = await mongoose.startSession();
    // starting the mongoose transaction
    session.startTransaction();
    try {
        const newFurniture = new Furniture({
            name,
            description,
            rentalPrice,
            availability,
            createdBy,
            mainImageUrl,
            imageUrls,
            creationDate: Date.now(),
        });
        const furniture = await newFurniture.save();
        await session.commitTransaction(); // Commit the transaction
        session.endSession();
        return res.status(201).json({ message: "Furniture created successfully!", furniture });
    } catch (err) {
        await session.abortTransaction(); // Rollback the transaction
        session.endSession();
        console.log(err.message)
        return res.status(500).json({ error: "Something went wrong!" });
    }
};

exports.updateFurniture = async (req, res) => {
    const { id } = req.params;
    const { name, description, rentalPrice, availability, mainImageUrl, imageUrls } = req.body;

    try {
        const furniture = await Furniture.findById(id);
        if (!furniture) {
            return res.status(404).json({ error: "Furniture not found!" });
        }

        furniture.name = name;
        furniture.description = description;
        furniture.rentalPrice = rentalPrice;
        furniture.availability = availability;
        furniture.mainImageUrl = mainImageUrl;
        furniture.imageUrls = imageUrls;

        const updatedFurniture = await furniture.save();
        return res.status(201).json({ message: "Furniture updated successfully!", furniture: updatedFurniture });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: "Something went wrong!" });
    }
};

exports.deleteFurniture = async (req, res) => {
  const { id } = req.params;

  try {
      const furniture = await Furniture.findById(id);
      if (!furniture) {
          return res.status(404).json({ error: "Furniture not found!" });
      }

      const bookings = await Booking.find({ furniture: id });
      if (bookings.length > 0) {
          for (const booking of bookings) {
              await booking.remove();
          }
      }

      await furniture.remove();
      return res.status(200).json({ message: "Furniture and associated bookings deleted successfully!" });
  } catch (err) {
      console.log(err.message)
      return res.status(500).json({ error: "Something went wrong!" });
  }
};
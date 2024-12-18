import Cars from "../model/carModel.js";

export const create = async (req, res) => {
  try {
    const newCar = new Cars(req.body);
    const { CIN } = newCar;

    const carExist = await Cars.findOne({ CIN });
    if (carExist) {
      return res.status(400).json({ message: "car with this CIN already exists." });
    }
    const savedData = await newCar.save();
    res.status(200).json({ message: "car created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllCar = async (req, res) => {
  try {
    const carData = await Cars.find();
    if (!carData || carData.length === 0) {
      return res.status(404).json({ message: "car data not found." });
    }
    res.status(200).json(carData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const carExist = await Cars.findById(id);
    if (!carExist) {
      return res.status(404).json({ message: "car not found." });
    }
    res.status(200).json(carExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const carExist = await Cars.findById(id);
    if (!carExist) {
      return res.status(404).json({ message: "car not found." });
    }
    const updatedData = await Cars.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "car Updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const carExist = await Cars.findById(id);
    if (!carExist) {
      return res.status(404).json({ message: "car not found." });
    }
    await Cars.findByIdAndDelete(id);
    res.status(200).json({ message: "car deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
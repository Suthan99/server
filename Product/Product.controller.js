//Workout Model imported
const currentModel = require("./Product.model");
const Product = require("./demoProduct"); // Adjust the path if needed

const mongoose = require("mongoose");

const getAll = async (req, res) => {
  try {
   
     
    res.status(200).json(Product);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: error.message });
  }
};

// get a single
const getSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  const defaultTemModel = await currentModel.findById(id);

  if (!defaultTemModel) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  res.status(200).json(defaultTemModel);
};
// filterWithCourseId

// get a by unit id
const filterWithCourseId = async (req, res) => {
  const { courseID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseID)) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  const defaultTemModel = await currentModel.find({ courseID: courseID });

  if (!defaultTemModel) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  res.status(200).json(defaultTemModel);
};

// create a new currentModel
const createWithoutReqBodyCheck = async (req, res) => {
  //add doc to db
  try {
    const defaultTemModel = await currentModel.create(req.body);
    res.status(200).json(defaultTemModel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNew = async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new document
    const defaultTemModel = await currentModel.create(req.body);
    res.status(200).json(defaultTemModel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a currentModel
const deleteSinle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  const defaultTemModel = await currentModel.findOneAndDelete({ _id: id });

  if (!defaultTemModel) {
    return res.status(400).json({ error: "No Such Volunteer Job" });
  }

  res.status(200).json(defaultTemModel);
};

// update a workout
const updateDocument = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  const defaultTemModel = await currentModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!defaultTemModel) {
    return res.status(400).json({ error: "No Such Workout" });
  }

  res.status(200).json(defaultTemModel);
};

module.exports = {
  getSingle,
  getAll,
  createNew,
  deleteSinle,
  updateDocument,
  createWithoutReqBodyCheck,
  filterWithCourseId,
};

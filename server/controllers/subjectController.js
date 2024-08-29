const subject = require("../model/Subject");

const getAllSubject = async (req, res) => {
  // Get all users from MongoDB
  const allsubject = await subject.find();

  // If no users
  if (!allsubject?.length) {
    return res.status(400).json({ message: "No Subject found" });
  }

  res.json(allsubject);
};

const getSingleSubject = async (req, res) => {
  const { subjectcode } = req.body;
  const singleSubject = await subject
    .findOne({ subjectcode })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (singleSubject) {
    return res.status(200).json(singleSubject);
  }
  return res.status(400).json({ message: "No Subject found" });
};

const CreateSubject = async (req, res) => {
  console.log(req.body);
  const {
    program,
    course,
    coursename,
    department,
    part,
    year,
    semester,
    subjectcode,
    subjectname,
    hour,
    courseincharge,
  } = req.body;

  // Confirm data
  if (
    !program ||
    !course ||
    !coursename ||
    !department ||
    !part ||
    !year ||
    !semester ||
    !subjectcode ||
    !subjectname ||
    !hour ||
    !courseincharge
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await subject
    .findOne({ subjectcode })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Sunject Code Already excited" });
  }

  const subjectObject = {
    program,
    course,
    coursename,
    department,
    part,
    year,
    semester,
    subjectcode,
    subjectname,
    hour,
    courseincharge,
  };
  const Createsubject = await subject.create(subjectObject);

  if (Createsubject) {
    //created
    res.status(201).json({ message: `New Subject ${subjectcode} created` });
  } else {
    res.status(400).json({ message: "Invalid subject data received" });
  }
};

const deleteSubject = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Subject Id Required" });
  }

  // Does the user exist to delete?
  const Subject = await subject.findById(id).exec();

  if (!Subject) {
    return res.status(400).json({ message: "Subject not found" });
  }

  const result = await subject.deleteOne();

  res.json({ message: "Subject deleted" });
};

module.exports = {
  getAllSubject,
  getSingleSubject,
  CreateSubject,
  deleteSubject,
};

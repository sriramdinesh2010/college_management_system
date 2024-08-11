const student = require("../model/Student");

const getAllStudents = async (req, res) => {
  // Get all users from MongoDB
  const allstudent = await student.find();

  // If no users
  if (!allstudent?.length) {
    return res.status(400).json({ message: "No Student found" });
  }

  res.json(allstudent);
};

const getSingleStudent = async (req, res) => {
  const { registernumber } = req.params;
  const singleStudent = await student
    .findOne({ registernumber })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (singleStudent) {
    return res.status(200).json(singleStudent);
  }
  return res.status(400).json({ message: "No Student found" });
};

const studentRegistration = async (req, res) => {
  console.log(req.body);
  const {
    registernumber,
    firstname,
    lastname,
    gender,
    fathername,
    mothername,
    dob,
    bloodgroup,
    phone,
    email,
    address,
    city,
    state,
    country,
    program,
    course,
    department,
    currentsemester,
    joiningdate,
  } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }
  // Confirm data
  if (
    !registernumber &&
    !firstname &&
    !lastname &&
    !gender &&
    !fathername &&
    !mothername &&
    !dob &&
    !bloodgroup &&
    !phone &&
    !email &&
    !address &&
    !city &&
    !state &&
    !country &&
    !program &&
    !course &&
    !department &&
    !currentsemester &&
    !joiningdate
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await student
    .findOne({ registernumber })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Register Number Already excited" });
  }

  const userObject = {
    image: image?.path,
    registernumber,
    firstname,
    lastname,
    gender,
    fathername,
    mothername,
    dob,
    bloodgroup,
    phone,
    email,
    address,
    city,
    state,
    country,
    program,
    course,
    department,
    currentsemester,
    joiningdate,
  };
  const Createuser = await student.create(userObject);

  if (Createuser) {
    //created
    res.status(201).json({ message: `New Student ${registernumber} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Student ID Required" });
  }

  // Does the user exist to delete?
  const Student = await student.findById(id).exec();

  if (!Student) {
    return res.status(400).json({ message: "Student not found" });
  }

  const result = await Student.deleteOne();

  res.json({ message: "student deleted" });
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  studentRegistration,
  deleteStudent,
};

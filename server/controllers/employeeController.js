const employee = require("../model/Employee");

const getAllEmployee = async (req, res) => {
  // Get all users from MongoDB
  const allemployee = await employee.find();

  // If no employee
  if (!allemployee?.length) {
    return res.status(400).json({ message: "No Employee found" });
  }

  res.json(allemployee);
};

const getSingleEmployee = async (req, res) => {
  const { registernumber } = req.params;
  const singleEmpoloyee = await employee
    .findOne({ registernumber })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (singleEmpoloyee) {
    return res.status(200).json(singleEmpoloyee);
  }
  return res.status(400).json({ message: "No Employee found" });
};

const employeeRegistration = async (req, res) => {
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
    role,
    department,
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
    !role &&
    !department &&
    !joiningdate
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await employee
    .findOne({ registernumber })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Employee Number Already excited" });
  }

  const employeeObject = {
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
    role,
    department,
    joiningdate,
  };
  const Createempolyee = await employee.create(employeeObject);

  if (Createempolyee) {
    //created
    res.status(201).json({ message: `New Employee ${registernumber} created` });
  } else {
    res.status(400).json({ message: "Invalid Empolyee data received" });
  }
};

const deleteEmpolyee = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Employee ID Required" });
  }

  // Does the user exist to delete?
  const Employee = await employee.findById(id).exec();

  if (!Employee) {
    return res.status(400).json({ message: "Student not found" });
  }

  const result = await employee.deleteOne();

  res.json({ message: "Employee deleted" });
};

module.exports = {
  getAllEmployee,
  getSingleEmployee,
  employeeRegistration,
  deleteEmpolyee,
};

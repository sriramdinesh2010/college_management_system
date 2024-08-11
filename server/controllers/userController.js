const user = require("../model/user");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await user.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

const userRegistration = async (req, res) => {
  console.log(req.body);
  const { name, age, email, password } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }
  // Confirm data
  if (!name && !age && !email && password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await user
    .findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Email Already excited" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = {
    image: image?.path,
    name,
    age,
    email,
    password: hashedPwd,
  };
  const Createuser = await user.create(userObject);

  if (Createuser) {
    //created
    res.status(201).json({ message: `New user ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

module.exports = {
  getAllUsers,
  userRegistration,
};

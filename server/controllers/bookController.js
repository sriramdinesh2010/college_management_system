const book = require("../model/Book");

const getAllBook = async (req, res) => {
  // Get all users from MongoDB
  const allBook = await book.find();

  // If no users
  if (!allBook?.length) {
    return res.status(400).json({ message: "No Book found" });
  }

  res.json(allBook);
};

const getSingleBook = async (req, res) => {
  const { accessnumber } = req.params;
  const singleBook = await book
    .findOne({ accessnumber })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (singleBook) {
    return res.status(200).json(singleBook);
  }
  return res.status(400).json({ message: "No Book found" });
};

const bookRegistration = async (req, res) => {
  console.log(req.body);
  const {
    accessnumber,
    isbn_number,
    callNumber,
    ddcnumber,
    oclcnumber,
    title,
    author,
    publisher,
    barcode,
  } = req.body;
  const image = req.file;
  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }
  // Confirm data
  if (
    !accessnumber &&
    !isbn_number &&
    !callNumber &&
    !ddcnumber &&
    !oclcnumber &&
    !title &&
    !author &&
    !publisher &&
    !barcode
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await book
    .findOne({ accessnumber })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Access Number Already excited" });
  }

  const bookObject = {
    image: image?.path,
    accessnumber,
    isbn_number,
    callNumber,
    ddcnumber,
    oclcnumber,
    title,
    author,
    publisher,
    barcode,
  };
  const CreateBook = await book.create(bookObject);

  if (CreateBook) {
    //created
    res.status(201).json({ message: `New Book ${accessnumber} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Book ID Required" });
  }

  // Does the user exist to delete?
  const books = await book.findById(id).exec();

  if (!books) {
    return res.status(400).json({ message: "Book not found" });
  }

  const result = await book.deleteOne();

  res.json({ message: `student ${result.accessnumber} deleted` });
};

module.exports = {
  getAllBook,
  getSingleBook,
  bookRegistration,
  deleteBook,
};

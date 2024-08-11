const notes = require("../model/Notes");

const getAllNotes = async (req, res) => {
  const allnote = await notes.find();

  // If no users
  if (!allnote?.length) {
    return res.status(200).json({ message: "No Notes found" });
  }
  res.status(200).json(allnote);
};

const createNewNotes = async (req, res) => {
  console.log(req.body);
  const { noteId, title, description, viewfor, publishdate } = req.body;
  if (!noteId || !title || !description || !viewfor || !publishdate) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check for duplicate username
  const duplicate = await notes
    .findOne({ noteId })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Note Already excited" });
  }

  const noteObject = {
    noteId,
    title,
    description,
    viewfor,
    publishdate,
  };
  const Createnote = await notes.create(noteObject);
  if (Createnote) {
    //created
    res.status(201).json({ message: `New Note ${noteId} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

const deleteNote = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Note ID required" });
  }

  // Confirm note exists to delete
  const note = await notes.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();
  res.json({ message: "Note deleted" });
};

module.exports = {
  getAllNotes,
  createNewNotes,
  deleteNote,
};

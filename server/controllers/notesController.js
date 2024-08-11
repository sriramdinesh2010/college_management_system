const notes = require("../model/Notes");

//get all notes
const getAllNotes = async (req, res) => {
  console.log(req.body);
  // // Get all notes from MongoDB
  // const allnote = await notes.find();

  // // If no users
  // if (!allnote?.length) {
  //   return res.status(400).json({ message: "No Notes found" });
  // }
  // res.status(200).json(allnote);
};

// create new notes
const userRegistration = async (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
};
// delete note
const deleteNote = async (req, res) => {
  const { noteId } = req.body;

  // Confirm data
  if (!noteId) {
    return res.status(400).json({ message: "Note ID Required" });
  }

  // Does the user exist to delete?
  const Notes = await notes.findById(noteId).exec();

  if (!Notes) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await notes.deleteOne();

  const reply = `Note${result.noteID} deleted`;

  res.json(reply);
};

module.exports = {
  getAllNotes,
  userRegistration,
  deleteNote,
};

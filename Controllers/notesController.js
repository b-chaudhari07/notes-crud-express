import Note from "../Models/notesModel.js";

export async function getallnotes(req, res) {
  const userId = req.user.id;
  let usernotes =await Note.find({ userId });
  res.status(200).json(usernotes);
}

export async function getnotebyid(req, res) {
  let idd = req.params.id;
  let note =await Note.findOne({ _id: idd, userId: req.user.id });

  if (!note) return res.status(404).json({ msg: "Note not found" });
  res.status(200).json(note);
}

export async function createnote(req, res) {
  const newnote =await Note.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.user.id,
  });
  res.status(201).json({ newnote, msg: "Note created succesfully" });
}

export async function updatenote(req, res) {
  const id = req.params.id;
  const note = await Note.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { title: req.body.title, content: req.body.content},
    {new: true, runValidators: true}
  );

  if(!note){
    return res.status(404).json({msg : "Note not found"});
  }

  return res.status(200).json({msg: "Note updated", note});
}

export async function deletenote(req, res) {
  let idd = req.params.id;
  const note =await Note.findOneAndDelete({ _id: idd, userId: req.user.id });
  if (!note)
    return res
      .status(404)
      .json({ msg: "note not found or unauthorized access" });

  res.status(200).json({ msg: "Note deleted succesfully" });
}

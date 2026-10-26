import { savenote, getnextid, notes } from "../Models/notesModel.js";

export function getallnotes(req, res) {
  const userid = req.user.id;
  let usernotes = notes.filter((note) => note.userId === userid);
  res.status(200).json(usernotes);
}

export function getnotebyid(req, res) {
  let idd = Number(req.params.id);
  let note = notes.find(
    (note) => note.id == idd && note.userId === req.user.id,
  );

  if (!note) return res.status(404).json({ msg: "Note not found" });
  res.status(200).json(note);
}

export function createnote(req, res) {
  let newnote = {
    id: getnextid(),
    title: req.body.title,
    content: req.body.content,
    userId: req.user.id,
  };

  notes.push(newnote);
  savenote();
  res.status(201).json({ newnote, msg: "Note created succesfully" });
}

export function updatenote(req, res) {
  let idd = parseInt(req.params.id);
  let newnote = {
    id: idd,
    title: req.body.title,
    content: req.body.content,
    userId: req.user.id
  };

  let index = notes.findIndex(
    (note) => note.id === idd && note.userId === req.user.id,
  );
  if (index===-1)
    return res
      .status(404)
      .json({ msg: "Notes not found or unAuthorized Access" });
  notes[index] = newnote;
  savenote();
  res.status(200).json(notes[index]);
}

export function deletenote(req, res) {
  let idd = parseInt(req.params.id);
  let index = notes.findIndex((note) => note.id === idd && note.userId=== req.user.id);
  if(index===-1) return res.status(404).json({"msg":"note not found or unauthorized access"});
  notes.splice(index, 1);
  savenote();
  res.status(200).json({ msg: "Note deleted succesfully" });
}

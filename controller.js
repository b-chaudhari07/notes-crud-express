import { savenote, getnextid, notes } from "./notesModel.js";

export function getallnotes(req, res) {
    res.status(200).json({notes});
}
export function getnotebyid(req, res) {
    let idd= req.params.id;
    let note=notes.find(note => note.id==idd);
    res.status(200).json(note);
}

export function createnote(req, res) {
    let newnote={
        id: getnextid(),
        title: req.body.title,
        content: req.body.content
    }

    notes.push(newnote);
    savenote();
    res.status(201).json({newnote, "msg":"Note created succesfully"});
}

export function updatenote(req, res) {
    let idd= parseInt(req.params.id);
    let newnote={
        id: idd,
        title: req.body.title,
        content: req.body.content
    }

    let index= notes.findIndex((note)=>note.id===idd);
    notes[index]=newnote;
    savenote();
    res.status(200).json(notes[index]);
}

export function deletenote(req, res) {
    let idd= parseInt(req.params.id);
    let index= notes.findIndex((note)=> note.id===idd);
    notes.splice(index,1);
    savenote();
    res.status(200).json({"msg": "Note deleted succesfully"});
}
import { Router } from "express";
import {
  getallnotes,
  getnotebyid,
  createnote,
  updatenote,
  deletenote,
} from "../Controllers/notesController.js";
import { validate } from "../middleware/validate.js";
import { createNoteSchema, idParamSchema, updateNoteSchema } from "../schemas/notesSchema.js";
import { verifyjwt } from "../middleware/requirejwt.js";


const app = Router();
app.use(verifyjwt);

app.get("/", getallnotes);
app.get("/:id",validate(idParamSchema), getnotebyid);
app.post("/", validate(createNoteSchema), createnote);
app.put("/:id", validate(updateNoteSchema), updatenote);
app.delete("/:id", deletenote);

export default app;

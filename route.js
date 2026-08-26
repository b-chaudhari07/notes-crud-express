import { Router } from "express";
import { getallnotes, getnotebyid, createnote, updatenote, deletenote } from "./controller.js";
import { authcheck } from "./middleware.js";

const app= Router();

app.get("/", getallnotes);
app.get("/:id", getnotebyid);
app.post("/",authcheck ,createnote);
app.put("/:id", authcheck, updatenote);
app.delete("/:id",authcheck, deletenote);

export default app;
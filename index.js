import express from "express";
import notesRouter from "./route.js";
import { logger } from "./middleware.js";


const app= express();

app.use(express.json());
app.use(logger);
app.use("/notes", notesRouter);

let PORT= 3000;
app.listen(PORT , ()=>{
    console.log(`Server is listening on ${PORT}`);
})

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});
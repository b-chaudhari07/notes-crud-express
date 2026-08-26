import fs, { readFileSync, writeFileSync } from "fs";
export let notes;

try {
    notes = JSON.parse(readFileSync("notes.json"));
} catch (error) {
    notes=[];
}

export function savenote(){
    writeFileSync("notes.json", JSON.stringify(notes));
}

export function getnextid(){
    if(notes.length==0) return 1;
    return Math.max(...notes.map(n=> n.id)) +1;
}
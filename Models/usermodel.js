import fs, { readFileSync, writeFileSync } from "fs";
import crypto from "crypto";
let users = [];

try {
  users = JSON.parse(readFileSync("users.json", "utf8"));
} catch (e) {
  if (e.code === "ENOENT") users = [];
  else throw e;
}

function saveuser() {
  writeFileSync("users.json", JSON.stringify(users));
}

export function findbyusername(name) {
    const n= name.toLowerCase().trim();
  return users.find((u) => u.username === n);
}

export function findbyid(userid) {
  return users.find((u) => u.id === userid);
}

export function createuser({ username, passwordHash }) {
  let user = {
    id: crypto.randomUUID(),
    username: username.toLowerCase().trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveuser();
  return user;
}

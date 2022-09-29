const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const { v4: uuidv4 } = require("uuid");

const PORT = 3030;
const contactsPath = path.resolve("../db/contacts.json");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl, new Date().toISOString());
  next();
});

app.get("/home", async (req, res) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const user = JSON.parse(data);
  res.json(user);
  console.table(user);
});

app.post("/home", async (req, res) => {
  const id = uuidv4();
  const data = await fs.readFile(contactsPath, "utf-8");
  const user = JSON.parse(data);
  const newData = [
    ...user,
    { id, name: req.body.name, email: req.body.email, phone: req.body.phone },
  ];
  fs.writeFile(contactsPath, JSON.stringify(newData));
  res.json({ data: newData, body: req.body });
  console.table(req.body);
  console.table(newData);
});

app.delete("/home", async (req, res) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const user = JSON.parse(data);
  const newData = user.filter((el) => req.body.id !== el.id);
  fs.writeFile(contactsPath, JSON.stringify(newData));
  res.json({ data: newData, body: req.body });
  console.table(req.body);
  console.table(newData);
});

app.use("/home", (req, res) => {
  res.send("use result");
});

app.listen(PORT, (err) => {
  if (err) "Error server";
  console.log(`Server works at port ${PORT}`);
});

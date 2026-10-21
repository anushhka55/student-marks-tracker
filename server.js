const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const DB_FILE = path.join(__dirname, "data.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const load = () => (fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : []);
const save = (d) => fs.writeFileSync(DB_FILE, JSON.stringify(d, null, 2));

// READ all
app.get("/api/students", (req, res) => res.json(load()));

// CREATE
app.post("/api/students", (req, res) => {
  const { name, subject, marks } = req.body;
  if (!name || !subject || marks === undefined || marks < 0 || marks > 100)
    return res.status(400).json({ error: "name, subject and marks (0-100) are required" });
  const data = load();
  const student = { id: Date.now(), name, subject, marks: Number(marks) };
  data.push(student);
  save(data);
  res.status(201).json(student);
});

// UPDATE
app.put("/api/students/:id", (req, res) => {
  const data = load();
  const s = data.find((x) => x.id == req.params.id);
  if (!s) return res.status(404).json({ error: "Not found" });
  const { name, subject, marks } = req.body;
  if (name) s.name = name;
  if (subject) s.subject = subject;
  if (marks !== undefined) s.marks = Number(marks);
  save(data);
  res.json(s);
});

// DELETE
app.delete("/api/students/:id", (req, res) => {
  const data = load().filter((x) => x.id != req.params.id);
  save(data);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

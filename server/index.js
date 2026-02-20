import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DATA_PATH = path.join(__dirname, "data.json");
const PORT = 3001;

app.use(cors());
app.use(express.json());

// data.json 읽기 헬퍼
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const writeData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

/* ── WORDS ── */
app.get("/api/words", (req, res) => {
  const { words } = readData();
  res.json(words);
});

app.post("/api/words", (req, res) => {
  const data = readData();
  const newWord = { ...req.body, id: Date.now() };
  data.words = [newWord, ...data.words];
  writeData(data);
  res.json(newWord);
});

app.put("/api/words/:id", (req, res) => {
  const data = readData();
  data.words = data.words.map((w) =>
    w.id === Number(req.params.id) ? { ...w, ...req.body } : w
  );
  writeData(data);
  res.json({ ok: true });
});

app.delete("/api/words/:id", (req, res) => {
  const data = readData();
  data.words = data.words.filter((w) => w.id !== Number(req.params.id));
  writeData(data);
  res.json({ ok: true });
});

/* ── THEMES ── */
app.get("/api/themes", (req, res) => {
  const { themes } = readData();
  res.json(themes);
});

app.post("/api/themes", (req, res) => {
  const data = readData();
  const newTheme = { ...req.body, id: `t_${Date.now()}` };
  data.themes = [...data.themes, newTheme];
  writeData(data);
  res.json(newTheme);
});

app.delete("/api/themes/:id", (req, res) => {
  const data = readData();
  data.themes = data.themes.filter((t) => t.id !== req.params.id);
  writeData(data);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
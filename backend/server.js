// ── Imports ───────────────────────────────────────────────────────────────────
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const Note = require("./noteModel");

// ── App Setup ─────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());                  // Allow frontend (different port) to talk to this server
app.use(express.json());          // Parse incoming JSON request bodies

// ── Connect to MongoDB ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB:", process.env.MONGO_URI))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ── Routes ────────────────────────────────────────────────────────────────────

// Health check — useful for Kubernetes liveness probes
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET /api/notes — return all notes (newest first)
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// POST /api/notes — create a new note
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

// DELETE /api/notes/:id — delete a note by its MongoDB ID
app.delete("/api/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

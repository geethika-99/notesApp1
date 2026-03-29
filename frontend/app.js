// ─── Point this to your backend server ───────────────────────────────────────
// When running locally:          http://localhost:5000
// When running via Docker:       http://localhost:5000
// When running via Kubernetes:   replace with minikube service URL
const API_URL = "http://localhost:5000";
// ─────────────────────────────────────────────────────────────────────────────

// Load all notes when the page opens
window.onload = fetchNotes;

// ── Fetch all notes from the backend ─────────────────────────────────────────
async function fetchNotes() {
  const container = document.getElementById("notesList");
  try {
    const res = await fetch(`${API_URL}/api/notes`);
    const notes = await res.json();

    if (notes.length === 0) {
      container.innerHTML = `<p class="empty">No notes yet. Add one above!</p>`;
      return;
    }

    container.innerHTML = notes.map(note => `
      <div class="note-card">
        <h3>${escapeHtml(note.title)}</h3>
        <p>${escapeHtml(note.content)}</p>
        <p class="date">${new Date(note.createdAt).toLocaleString()}</p>
        <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
      </div>
    `).join("");

  } catch (err) {
    container.innerHTML = `<p class="empty error">Could not connect to backend. Is the server running?</p>`;
  }
}

// ── Add a new note ────────────────────────────────────────────────────────────
async function addNote() {
  const title   = document.getElementById("titleInput").value.trim();
  const content = document.getElementById("contentInput").value.trim();
  const msg     = document.getElementById("formMsg");

  // Basic validation
  if (!title || !content) {
    msg.textContent = "Please fill in both title and content.";
    msg.className = "msg error";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });

    if (res.ok) {
      document.getElementById("titleInput").value = "";
      document.getElementById("contentInput").value = "";
      msg.textContent = "Note added successfully!";
      msg.className = "msg";
      fetchNotes(); // Refresh list
    } else {
      msg.textContent = "Failed to add note.";
      msg.className = "msg error";
    }
  } catch (err) {
    msg.textContent = "Could not connect to backend.";
    msg.className = "msg error";
  }
}

// ── Delete a note by ID ───────────────────────────────────────────────────────
async function deleteNote(id) {
  try {
    await fetch(`${API_URL}/api/notes/${id}`, { method: "DELETE" });
    fetchNotes(); // Refresh list
  } catch (err) {
    alert("Could not delete note.");
  }
}

// ── Helper: prevent XSS ──────────────────────────────────────────────────────
function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

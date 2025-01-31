const express = require("express");
const db = require("./db"); // Import koneksi database

const app = express();
const port = 3001;

app.use(express.json());

// Contoh endpoint untuk mendapatkan data dari database
app.get("/camaba", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM tbl_camaba");
    res.json(results);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

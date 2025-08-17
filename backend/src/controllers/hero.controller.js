import connection from "../db.js";

// GET /api/hero
export const getHeroes = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Hero ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/hero
export const createHero = async (req, res) => {
  const { name, photoUrl, summary } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO Hero (name, photoUrl, summary) VALUES (?, ?, ?)",
      [name, photoUrl, summary]
    );
    res.json({ message: "Hero created", heroId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/hero/:id
export const updateHero = async (req, res) => {
  const { id } = req.params;
  const { name, photoUrl, summary } = req.body;
  try {
    await connection.query(
      "UPDATE Hero SET name=?, photoUrl=?, summary=? WHERE id=?",
      [name, photoUrl, summary, id]
    );
    res.json({ message: "Hero updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/hero/:id
export const deleteHero = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM Hero WHERE id=?", [id]);
    res.json({ message: "Hero deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

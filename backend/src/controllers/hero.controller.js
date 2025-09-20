import connection from "../db/pool.js";

// GET /api/hero
export const getHeroes = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM hero ORDER BY id DESC");
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
      "INSERT INTO hero (name, photoUrl, summary) VALUES (?, ?, ?)",
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
  const { name, summary } = req.body;

  try {
    let photoUrl = null;

    // если файл загружен — берем его путь
    if (req.file) {
      photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // если файл загружен — обновляем вместе с фото
    if (photoUrl) {
      await connection.query(
        "UPDATE hero SET name=?, summary=?, photoUrl=? WHERE id=?",
        [name, summary, photoUrl, id]
      );
    } else {
      // если фото не передавалось, обновляем только текст
      await connection.query(
        "UPDATE hero SET name=?, summary=? WHERE id=?",
        [name, summary, id]
      );
    }

    res.json({ message: "Hero updated successfully" });
  } catch (err) {
    console.error("Update Hero error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/hero/:id
export const deleteHero = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM hero WHERE id=?", [id]);
    res.json({ message: "Hero deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

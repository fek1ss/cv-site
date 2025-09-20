import connection from "../db/pool.js";

export const getAbout = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM about ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAbout = async (req, res) => {
  const { text } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO about (text) VALUES (?)",
      [text]
    );
    res.json({ message: "About created", aboutId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAbout = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    await connection.query("UPDATE about SET text=? WHERE id=?", [text, id]);
    res.json({ message: "About updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAbout = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM about WHERE id=?", [id]);
    res.json({ message: "About deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
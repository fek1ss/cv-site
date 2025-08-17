import connection from "../db.js";

export const getAbout = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM About ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAbout = async (req, res) => {
  const { text } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO About (text) VALUES (?)",
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
    await connection.query("UPDATE About SET text=? WHERE id=?", [text, id]);
    res.json({ message: "About updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAbout = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM About WHERE id=?", [id]);
    res.json({ message: "About deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
import connection from "../db/pool.js";

export const getEducations = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Education ORDER BY yearStart DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEducation = async (req, res) => {
  const { degreeShort, degreeFull, university, yearStart, yearEnd } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO Education (degreeShort, degreeFull, university, yearStart, yearEnd) VALUES (?, ?, ?, ?, ?)",
      [degreeShort, degreeFull, university, yearStart, yearEnd]
    );
    res.json({ id: result.insertId, message: "Education created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEducation = async (req, res) => {
  const { id } = req.params;
  const { degreeShort, degreeFull, university, yearStart, yearEnd } = req.body;
  try {
    const [result] = await connection.query(
      "UPDATE Education SET degreeShort=?, degreeFull=?, university=?, yearStart=?, yearEnd=? WHERE id=?",
      [degreeShort, degreeFull, university, yearStart, yearEnd, id]
    );
    if (result.affectedRows === 0) return res.json({ error: "Nothing changed" });
    res.json({ message: "Education updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query("DELETE FROM Education WHERE id=?", [id]);
    if (result.affectedRows === 0) return res.json({ error: "Not found" });
    res.json({ message: "Education deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

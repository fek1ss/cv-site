import connection from "../db/pool.js";

export const getProjects = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Projects ORDER BY dateStart DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProject = async (req, res) => {
  const { name, description, dateStart, dateEnd, link } = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }
  try {
    const [result] = await connection.query(
      "INSERT INTO Projects (name, description, dateStart, dateEnd, imageUrl, link) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, dateStart, dateEnd, imageUrl, link]
    );
    res.json({ id: result.insertId, message: "Project created", imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, dateStart, dateEnd, link } = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }
  try {
    const [result] = await connection.query(
      "UPDATE Projects SET name=?, description=?, dateStart=?, dateEnd=?, link=?, imageUrl=COALESCE(?, imageUrl) WHERE id=?",
      [name, description, dateStart, dateEnd, link, imageUrl, id]
    );
    if (result.affectedRows === 0) return res.json({ error: "Nothing changed" });
    res.json({ message: "Project updated", imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query("DELETE FROM Projects WHERE id=?", [id]);
    if (result.affectedRows === 0) return res.json({ error: "Not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

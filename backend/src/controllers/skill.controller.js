import connection from "../db.js";

export const getSkills = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Skill ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createSkill = async (req, res) => {
  const { name, iconUrl } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO Skill (name, iconUrl) VALUES (?, ?)",
      [name, iconUrl]
    );
    res.json({ message: "Skill created", skillId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body; 
  const file = req.file; 

  try {
    let iconUrl = null;

    if (file) {
      iconUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    await connection.query(
      "UPDATE Skill SET name=?, iconUrl=? WHERE id=?",
      [name, iconUrl, id]
    );

    res.json({ message: "Skill updated", iconUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM Skill WHERE id=?", [id]);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

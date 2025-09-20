// backend/src/controllers/position.controller.js
import connection from "../db/pool.js";

// GET /api/position — все позиции с названием компании
export const getPositions = async (req, res) => {
  const sql = `
    SELECT p.id as positionId, p.title, p.startDate, p.endDate,
          c.id as companyId, c.name as companyName
    FROM positions p
    JOIN Company c ON p.companyId = c.id
    ORDER BY p.startDate DESC
  `;

  try {
    const [rows] = await connection.query(sql);
    const positions = rows.map(row => ({
      id: row.positionId,
      title: row.title,
      startDate: row.startDate,
      endDate: row.endDate,
      company: {
        id: row.companyId,
        name: row.companyName
      }
    }));
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/position
export const createPosition = async (req, res) => {
  const { title, startDate, endDate, companyId } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO positions (title, startDate, endDate, companyId) VALUES (?, ?, ?, ?)",
      [title, startDate, endDate, companyId]
    );
    res.json({ message: "positions created", positionId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/position/:id
export const updatePosition = async (req, res) => {
  const { id } = req.params;
  const { title, startDate, endDate, companyId } = req.body;
  try {
    await connection.query(
      "UPDATE positions SET title=?, startDate=?, endDate=?, companyId=? WHERE id=?",
      [title, startDate, endDate, companyId, id]
    );
    res.json({ message: "Position updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/position/:id
export const deletePosition = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM positions WHERE id=?", [id]);
    res.json({ message: "Position deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

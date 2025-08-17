// backend/src/controllers/contact.controller.js
import connection from "../db.js";

// GET /api/contact
export const getContacts = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Contact ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/contact
export const createContact = async (req, res) => {
  const { label, link, iconUrl } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO Contact (label, link, iconUrl) VALUES (?, ?, ?)",
      [label, link, iconUrl]
    );
    res.json({ message: "Contact created", contactId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/contact/:id
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { label, link, iconUrl } = req.body;
  try {
    await connection.query(
      "UPDATE Contact SET label=?, link=?, iconUrl=? WHERE id=?",
      [label, link, iconUrl, id]
    );
    res.json({ message: "Contact updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/contact/:id
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM Contact WHERE id=?", [id]);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

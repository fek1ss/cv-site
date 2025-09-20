// backend/src/controllers/contact.controller.js
import connection from "../db/pool.js";

// GET /api/contact
export const getContacts = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM contact ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/contact
export const createContact = async (req, res) => {
  const { label, link } = req.body;

  try {
    let iconUrl = null;

    if (req.file) {
      iconUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const [result] = await connection.query(
      "INSERT INTO contact (label, link, iconUrl) VALUES (?, ?, ?)",
      [label, link, iconUrl]
    );

    res.json({ 
      message: "Contact created", 
      contactId: result.insertId,
      iconUrl 
    });
  } catch (err) {
    console.error("Create Contact error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { label, link } = req.body;

  try {
    let iconUrl = null;

    if (req.file) {
      iconUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    await connection.query(
      "UPDATE Contact SET label=?, link=?, iconUrl=COALESCE(?, iconUrl) WHERE id=?",
      [label, link, iconUrl, id]
    );

    res.json({ message: "Contact updated", iconUrl });
  } catch (err) {
    console.error("Update Contact error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/contact/:id
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM contact WHERE id=?", [id]);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

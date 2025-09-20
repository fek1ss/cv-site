import connection from "../db/pool.js";

export const getBooks = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBook = async (req, res) => {
  const { title, description, link, author } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO books (title, description, link, author) VALUES (?, ?, ?, ?)",
      [title, description, link, author]
    );
    res.json({ id: result.insertId, message: "Book created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, link, author } = req.body;
  try {
    const [result] = await connection.query(
      "UPDATE books SET title=?, description=?, link=?, author=? WHERE id=?",
      [title, description, link, author, id]
    );
    if (result.affectedRows === 0) return res.json({ error: "Nothing changed" });
    res.json({ message: "Book updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query("DELETE FROM books WHERE id=?", [id]);
    if (result.affectedRows === 0) return res.json({ error: "Not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

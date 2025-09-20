// backend/src/controllers/article.controller.js
import connection from "../db/pool.js";

export const getArticles = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM article ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createArticle = async (req, res) => {
  const { title, link } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO article (title, link) VALUES (?, ?)",
      [title, link]
    );
    res.json({ message: "Article created", articleId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, link } = req.body;
  try {
    await connection.query(
      "UPDATE article SET title=?, link=? WHERE id=?",
      [title, link, id]
    );
    res.json({ message: "Article updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM article WHERE id=?", [id]);
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import connection from "../db.js";

export const getSkills = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Skill ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Импортируйте multer, если вы еще этого не сделали
// const multer = require('multer'); 
// const upload = multer({ dest: 'uploads/' }); // Или ваша конфигурация

export const createSkill = async (req, res) => {
  // 1. Получаем данные из req.body (имя) и req.file (загруженный файл)
  const { name } = req.body;
  const file = req.file; 

  // 2. Проверяем, был ли файл отправлен
  if (!file) {
    return res.status(400).json({ error: "Необходимо загрузить файл-иконку." });
  }

  // 3. Генерируем URL для сохраненного файла
  // Это та же логика, что и в функции обновления
  const iconUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  
  try {
    // 4. Используем iconUrl в SQL-запросе для вставки
    const [result] = await connection.query(
      "INSERT INTO Skill (name, iconUrl) VALUES (?, ?)",
      [name, iconUrl]
    );

    // 5. Возвращаем успешный ответ
    res.json({ message: "Skill created", skillId: result.insertId, iconUrl });
  } catch (err) {
    // 6. Обрабатываем возможные ошибки
    res.status(500).json({ error: err.message });
  }
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body; 
  const file = req.file; 

  try {
    let iconUrl = null;

    if (req.file) {
      iconUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    await connection.query(
      "UPDATE Skill SET name=?, iconUrl=COALESCE(?, iconUrl) WHERE id=?",
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

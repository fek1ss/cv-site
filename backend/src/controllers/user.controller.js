// backend/src/controllers/user.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connection from "../db/pool.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// POST /api/users/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email и password обязательны" });
    }

    // есть ли такой email уже
    const [exists] = await connection.query("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length > 0) {
      return res.status(409).json({ error: "Пользователь с таким email уже существует" });
    }

    // хэш пароля (bcryptjs sync-версии, чтобы без коллбеков)
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const [result] = await connection.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );

    return res.status(201).json({
      message: "User registered",
      user: { id: result.insertId, name, email }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// POST /api/users/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "email и password обязательны" });

    const [rows] = await connection.query(
      "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const user = rows[0];
    if (!user) return res.status(400).json({ error: "User not found" });

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET /api/users/me
export const me = async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "No token" });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, JWT_SECRET); // { id, name, email, iat, exp }

    // опционально можно перепроверить, что пользователь ещё существует:
    // const [rows] = await connection.query("SELECT id FROM users WHERE id=?", [decoded.id]);
    // if (rows.length === 0) return res.status(401).json({ error: "User not found" });

    return res.json({ id: decoded.id, name: decoded.name, email: decoded.email });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

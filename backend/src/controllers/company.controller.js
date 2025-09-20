// backend/src/controllers/company.controller.js
import connection from "../db/pool.js";

// GET /api/company — компании с их позициями
export const getCompanies = async (req, res) => {
  const sql = `
    SELECT c.id as companyId, c.name as companyName, c.logoUrl,
    p.id as positionId, p.title, p.startDate, p.endDate
    FROM company c
    LEFT JOIN positions p ON c.id = p.companyId
    ORDER BY c.id, p.startDate DESC
  `;

  try {
    const [results] = await connection.query(sql);

    const companies = [];
    const map = new Map();

    results.forEach(row => {
      if (!map.has(row.companyId)) {
        const company = {
          id: row.companyId,
          name: row.companyName,
          logoUrl: row.logoUrl,
          positions: []
        };
        map.set(row.companyId, company);
        companies.push(company);
      }
      if (row.positionId) {
        map.get(row.companyId).positions.push({
          id: row.positionId,
          title: row.title,
          startDate: row.startDate,
          endDate: row.endDate
        });
      }
    });

    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/company
export const createCompany = async (req, res) => {
  const { name } = req.body;

  try {
    let logoUrl = null;

    // если был загружен файл
    if (req.file) {
      logoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const [result] = await connection.query(
      "INSERT INTO company (name, logoUrl) VALUES (?, ?)",
      [name, logoUrl]
    );

    res.json({ 
      message: "Company created", 
      companyId: result.insertId,
      logoUrl 
    });
  } catch (err) {
    console.error("Create Company error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body; 

  try {
    let logoUrl = null;

    if (req.file) {
      logoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    await connection.query(
      "UPDATE company SET name=?, logoUrl=COALESCE(?, logoUrl) WHERE id=?",
      [name, logoUrl, id]
    );

    res.json({ message: "Company updated", logoUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE /api/company/:id
export const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM company WHERE id=?", [id]);
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

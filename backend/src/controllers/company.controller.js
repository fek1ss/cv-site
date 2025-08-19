// backend/src/controllers/company.controller.js
import connection from "../db.js";

// GET /api/company — компании с их позициями
export const getCompanies = async (req, res) => {
  const sql = `
    SELECT c.id as companyId, c.name as companyName, c.logoUrl,
    p.id as positionId, p.title, p.startDate, p.endDate
    FROM Company c
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
  const { name, logoUrl } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO Company (name, logoUrl) VALUES (?, ?)",
      [name, logoUrl]
    );
    res.json({ message: "Company created", companyId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/company/:id
export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, logoUrl } = req.body;
  try {
    await connection.query(
      "UPDATE Company SET name=?, logoUrl=? WHERE id=?",
      [name, logoUrl, id]
    );
    res.json({ message: "Company updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/company/:id
export const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM Company WHERE id=?", [id]);
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

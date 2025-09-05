// backend/src/index.js
import express from "express";
import cors from "cors";
import path from "path";
import heroRouter from "./routes/hero.routes.js";
import aboutRouter from "./routes/about.routes.js";
import skillRouter from "./routes/skill.routes.js";
import companyRouter from "./routes/company.routes.js";
import positionRouter from "./routes/position.routes.js";
import articleRouter from "./routes/article.routes.js";
import contactRouter from "./routes/contact.routes.js";
import userRouter from "./routes/user.routes.js";
import educationRouter from "./routes/education.routes.js";
import projectRouter from "./routes/project.routes.js";
import bookRouter from "./routes/book.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"  
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Подключение роутов
app.use("/api/hero", heroRouter);
app.use("/api/about", aboutRouter);
app.use("/api/skills", skillRouter);
app.use("/api/company", companyRouter);
app.use("/api/position", positionRouter);
app.use("/api/articles", articleRouter);
app.use("/api/contact", contactRouter);
app.use("/api/users", userRouter);
app.use("/api/education", educationRouter);
app.use("/api/projects", projectRouter);
app.use("/api/books", bookRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

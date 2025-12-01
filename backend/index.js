import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";

import StudentRoutes from "./routes/student.routes.js";
import ClassRoutes from "./routes/class.route.js";
import ProfessorRoutes from "./routes/professor.route.js";
import AnnouncementRoutes from "./routes/announcement.route.js";

const app = express();
const PORT = process.env.PORT || 4001;


connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.PROD_URL
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next()
})

app.use("/api/students", StudentRoutes);
app.use("/api/professors", ProfessorRoutes);
app.use("/api/class", ClassRoutes);
app.use("/api/announcements", AnnouncementRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;

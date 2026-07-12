const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dns = require('dns')
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/error.middleware");
dns.setServers(['1.1.1.1','8.8.8.8'])
const app = express();




app.use(
  cors({
  origin: [
      
      "https://task-management-frontend-ashy-zeta.vercel.app",
      "http://localhost:4200",
    ],
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Task Management API Running Successfully 🚀"
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});
app.use(errorHandler);
module.exports = app;
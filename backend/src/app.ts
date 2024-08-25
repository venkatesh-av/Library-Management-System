import "reflect-metadata";
import express from "express";
import userRoutes from "./routes/userRoutes";
import authorRoutes from "./routes/authorRoutes";
import bookRoutes from "./routes/bookRoutes";
import borrowingRoutes from "./routes/borrowingRoutes";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use("/", userRoutes);
app.use("/", authorRoutes);
app.use("/", bookRoutes);
app.use("/", borrowingRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

// Health-check route — returns DB connectivity status
app.get("/health", async (req, res) => {
  const dbOk = (await connectDB()) === true;
  return res.json({ ok: true, dbConnected: dbOk });
});

app.get("/", (req, res) => {
  res.send("Hello, World! Your server is running 🎉");
});

// For local development
if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log("Server is running");
  });
}

// Export the app so serverless platforms (Vercel) can invoke it.
export default app;

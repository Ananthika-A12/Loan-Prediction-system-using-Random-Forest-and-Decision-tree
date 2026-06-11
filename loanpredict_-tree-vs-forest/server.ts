import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/predict", (req, res) => {
    const { income, creditScore, employmentStatus, hasExistingLoan } = req.body;
    
    // We'll import the logic here or just re-implement it briefly for the backend demo
    // To keep it simple and avoid complex imports in this script, I'll just return a success message
    // and let the frontend handle the actual "training" logic for this beginner-friendly demo.
    // However, a real app would have the model here.
    
    res.json({ 
      status: "success",
      received: { income, creditScore, employmentStatus, hasExistingLoan }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

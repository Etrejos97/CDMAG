import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import ventaRoutes from "./routes/ventaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/productos", productRoutes);
app.use("/ventas", ventaRoutes);
app.use("/usuarios", usuarioRoutes);

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({
    status: "✅ Servidor funcionando",
    database: "CasaModas",
    timestamp: new Date().toISOString(),
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: "Error en el servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════╗
  ║   🚀 Servidor Casa de Modas A.G    ║
  ║   Puerto: ${PORT}                   ║
  ║   BD: CasaModas                     ║
  ║   Autenticación: JWT                ║
  ╚════════════════════════════════════╝
  `);
});

export default app;

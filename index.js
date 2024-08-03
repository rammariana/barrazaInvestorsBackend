import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";

import errorController from "./controllers/errorController.js";
import actionsControllers from "./controllers/actionsControllers.js";
import investorsController from "./controllers/inverstorsControllers.js";
import salesController from "./controllers/salesControllers.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["X-Requested-With", "content-type"],
    credentials: true,
  })
); // Protección de peticiones
app.use(helmet()); // Protege aplicaciones express
app.use(morgan("dev")); //Registra info de solicitudes http
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Indica: permite el análisis de datos?

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
// ACTIONS
app.post("/api/action", actionsControllers.postAction); // Crear nueva acción o añadir compra
app.get("/api/actions", actionsControllers.getAllActions); // Buscar todas las acciones
app.get("/api/action/:id", actionsControllers.getActionById); // Buscar acción por id
app.put("/api/action/:actionId/:buyId", actionsControllers.editBuyById); // Buscar compra y editar (id compra, id accion) sirve para eliminar acciones de una compra
app.delete(
  "/api/action/:actionId/buy/:buyId",
  actionsControllers.deleteBuyById
); // Buscar compra y eliminar toda la compra
app.delete("/api/action/:id", actionsControllers.deleteActionById); // Eliminar acción con todas sus compras

// Al hacer un POST se mira: si la acción existe, se añade y si no se crea / CREAR ACCION O CREAR COMPRA
// Al vender una accion se edita la cantidad si no se vende todo, o se elimina la compra si se vende toda la compra, o se elimina la accion completa si se vende TODO / EDITAR - ELIMINAR

// INVESTORS
app.post("/api/create-investor", investorsController.createInvestor); // Crear/agregar inversionista
app.get("/api/investors", investorsController.getAllInvestors); // Buscar todos los inversionistas
app.put("/api/investor/:id", investorsController.editInvestor); // Editar info de un inversionista
app.delete("/api/investor/:id", investorsController.deleteInvestor); // Borrar un inversionista

// SALES

app.post("/api/create-sale", salesController.createNewSale); // Crear nueva venta
app.get("/api/sales", salesController.getAllSales); // Crear nueva venta

app.use(errorController.handleNotFound); // Manejo de rutas no encontradas
app.use(errorController.handleServerError); // Manejo de errores internos del servidor
app.listen(port, () => {
  console.log(`Iniciando app en http://localhost:${port}`);
});

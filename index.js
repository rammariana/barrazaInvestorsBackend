import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";

import errorController from "./controllers/errorController.js";
import actionsControllers from "./controllers/actionsControllers.js";
// import investorsController from "./controllers/inverstorsControllers.js";
// import salesController from "./controllers/salesControllers.js";

const app = express();
const port = 3000;

app.use(cors()); // Protección de peticiones
app.use(helmet()); // Protege aplicaciones express
app.use(morgan("dev")); //Registra info de solicitudes http
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Indica: permite el análisis de datos?

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.post("/api/action", actionsControllers.postAction); // Crear nueva acción o añadir compra
app.get("/api/action/:id", actionsControllers.getActionById); // Buscar acción por id
app.get("/api/actions", actionsControllers.getAllActions); // Buscar todas las acciones

app.use(errorController);

app.listen(port, () => {
  console.log(`Iniciando app en http://localhost:${port}`);
});

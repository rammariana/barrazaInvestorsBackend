import dotenv from "dotenv";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

dotenv.config();
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    ssl: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

const buySchema = new Schema({
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true },
  fecha_compra: { type: Date, required: true },
  fecha_registro: { type: Date, default: Date.now },
});

const actionSchema = new Schema({
  simbolo: { type: String, required: true, unique: true },
  compra: [buySchema],
});

const Action = model("Action", actionSchema);

const postAction = async (req, res) => {
  const { simbolo, precio, cantidad, total, fecha_compra } = req.body;

  try {
    let action = await Action.findOne({ simbolo });

    // Si la acción no existe
    // crea una nueva y luego añade
    if (!action) {
      action = new Action({ simbolo, compra: [] });
    }
    // Si existe, la añade
    action.compra.push({ precio, cantidad, total, fecha_compra });

    await action.save();

    res.status(200).json({ message: "Acción guardada correctamente" });
  } catch (error) {
    console.error("Error al guardar la acción:", error);
    res.status(500).json({ message: "Error al guardar la acción" });
  }
};

const getAllActions = async (req, res) => {
  try {
    let actions = await Action.find({});

    if (actions.length === 0) {
      return res.status(404).json({ message: "No hay acciones guardadas" });
    }

    res.status(200).json({ actions });
  } catch (error) {
    console.error("Error al buscar datos", error);
    res.status(500).json({ message: "Error al guardar la acción" });
  }
};

const getActionById = async (req, res) => {
  const { id } = req.params;

  try {
    let action = await Action.findById({ _id: id });

    if (!action) {
      return res.status(404).json({ message: "Accion no encontrada" });
    }

    res.status(200).json({ action });
  } catch (error) {
    console.error("Error al buscar datos", error);
    res.status(500).json({ message: "Error al obtener la acción" });
  }
};

export default { postAction, getAllActions, getActionById };

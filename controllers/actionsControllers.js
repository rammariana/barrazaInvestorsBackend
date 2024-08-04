import dotenv from "dotenv";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

dotenv.config();
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    ssl: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB desde actions");
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

    return res.status(200).json({ message: "Acción guardada correctamente" });
  } catch (error) {
    console.error("Error al guardar la acción:", error);
    return res.status(500).json({ message: "Error al guardar la acción" });
  }
};

const getAllActions = async (req, res) => {
  console.log("getActions");
  // Busca todas las acciones
  try {
    let actions = await Action.find({});
    // find busca todos los documentos si se deja vacío

    if (actions.length === 0) {
      return res.status(404).json({ message: "No hay acciones guardadas" });
    }

    res.status(200).json({ actions });
  } catch (error) {
    console.error("Error al buscar datos", error);
    return res.status(500).json({ message: "Error al guardar la acción" });
  }
};

const getActionById = async (req, res) => {
  const { id } = req.params;

  try {
    let action = await Action.findById({ _id: id });

    if (!action) {
      return res.status(404).json({ message: "Accion no encontrada" });
    }

    return res.status(200).json({ action });
  } catch (error) {
    console.error("Error al buscar datos", error);
    return res.status(500).json({ message: "Error al obtener la acción" });
  }
};

const editBuyById = async (req, res) => {
  const { actionId, buyId } = req.params; // Id de acción
  const compra = req.body; // Valores a editar
  console.log(compra, actionId, buyId);

  try {
    // Buscamos la acción
    const actionToEdit = await Action.findById({ _id: actionId });

    // Si la acción No existe...
    if (!actionToEdit) {
      return res.status(404).json({ message: "Acción no encontrada" });
    }
    // Si la acción existe...
    // Buscamos la compra
    const compraToEdit = actionToEdit.compra.id({ _id: buyId });

    // Si la compra no existe...
    if (!compraToEdit) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }
    // Si existe, actualizamos campos necesarios
    Object.keys(compra).forEach((key) => {
      compraToEdit[key] = compra[key];
    });

    await actionToEdit.save();

    return res.status(200).json({
      message: "Compra actualizada correctamente",
      compra: compraToEdit,
    });
    //
  } catch (error) {
    console.error("Error al buscar datos", error);
    return res.status(500).json({ message: "Error al obtener la acción" });
  }
};

const deleteBuyById = async (req, res) => {
  const { actionId, buyId } = req.params;

  try {
    // Buscar accion a eliminar
    const actionToDelete = await Action.findById(actionId);

    // Si la acción no existe...
    if (!actionToDelete) {
      return res.status(404).json({ message: "Acción no encontrada" });
    }
    // Buscando compra y filtrando
    actionToDelete.compra = actionToDelete.compra.filter(
      (compra) => compra._id.toString() !== buyId
    );

    await actionToDelete.save();
    return res.status(200).json({ message: "Compra eliminada exitosamente" });
    //
  } catch (error) {
    console.error("Error al buscar datos", error);
    return res.status(500).json({ message: "Error al obtener la acción" });
  }
};

const deleteActionById = async (req, res) => {
  const { id } = req.params;

  try {
    const actionToDelete = await Action.findByIdAndDelete({ _id: id });

    if (!actionToDelete) {
      return res.status(404).json({ message: "Acción no encontrada" });
    }

    return res.status(200).json({ message: "Acción eliminada correctamente" });
  } catch (error) {
    console.error("Error al buscar datos", error);
    return res.status(500).json({ message: "Error al obtener la acción" });
  }
};

export default {
  postAction,
  getAllActions,
  getActionById,
  editBuyById,
  deleteBuyById,
  deleteActionById,
};

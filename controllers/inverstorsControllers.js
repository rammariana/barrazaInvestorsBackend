import dotenv from "dotenv";
import mongoose, { Schema, model } from "mongoose";

dotenv.config();
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    ssl: true,
  })
  .then(() => {
    console.log("conectado a Mongo");
  })
  .catch((error) => {
    console.log("Error al conectar con Mongo", error);
  });

const investorSchema = new Schema({
  nombre: { type: String, required: true },
  aporte: { type: Number },
  reinversion: { type: Number },
});

const Investor = model("Investor", investorSchema);

const createInvestor = async (req, res) => {
  const { nombre, aporte, reinversion } = req.body;

  try {
    const newInvestor = new Investor({
      nombre,
      aporte,
      reinversion,
    });

    await newInvestor.save();

    return res.status(200).json({ message: "Inversor añadido" });
  } catch (error) {
    console.error("Error al guardar inversionista:", error);
    return res.status(500).json({ message: "Error al guardar inversionista" });
  }
};

const editInvestor = async (req, res) => {
  const { nombre, aporte, reinversion } = req.body;
  const { id } = req.params;

  try {
    const investorToEdit = await Investor.findByIdAndUpdate(
      id,
      { nombre, aporte, reinversion },
      { new: true }
    );
    // FINDBYIDANDUPDAYE recibe el id y el objeto con los valores a editar
    // new: true devuelve el documento actualizado
    if (!investorToEdit) {
      return res.status(404).json({ message: "Inversionista no encontrado" });
    }

    return res.status(200).json({
      message: "Inversor editado exitosamente",
      investor: investorToEdit,
    });
    //
  } catch (error) {
    console.error("Error al editar inversionista:", error);
    return res.status(500).json({ message: "Error al editar inversionista" });
  }
};

const deleteInvestor = async (req, res) => {
  const { id } = req.params;

  try {
    const investorToDelete = await Investor.findByIdAndDelete(id);

    if (!investorToDelete) {
      return res.status(404).json({ message: "Inversionista no encontrado" });
    }

    res.status(200).json({ message: "Inversor eliminado exitosamente" });
    //
  } catch (error) {
    console.error("Error al borrar inversionista:", error);
    return res.status(500).json({ message: "Error al borrar inversionista" });
  }
};

const getAllInvestors = async (req, res) => {
  try {
    const investors = await Investor.find({});
    // find busca todos los documentos si se deja vacío

    if (investors.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay inversionistas en tu portafolio" });
    }

    return res.status(200).json({ investors });
  } catch (error) {
    console.error("Error buscar datos:", error);
    return res.status(500).json({ message: "Error buscar datos" });
  }
};

export default {
  createInvestor,
  editInvestor,
  deleteInvestor,
  getAllInvestors,
};

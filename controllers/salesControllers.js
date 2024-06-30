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
  .catch(() => {
    console.log("Error al conectar con Mongo", error);
  });

const saleSchema = new Schema({
  simbolo: { type: String, required: true },
  precio_compra: { type: Number, required: true },
  precio_venta: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  fecha_compra: { type: Date, required: true },
  fecha_venta: { type: Date, required: true },
});

const Sale = model("Sale", saleSchema);

const createNewSale = async (req, res) => {
  const {
    simbolo,
    precio_compra,
    precio_venta,
    cantidad,
    fecha_compra,
    fecha_venta,
  } = req.body;

  try {
    const sale = new Sale({
      simbolo,
      precio_compra,
      precio_venta,
      cantidad,
      fecha_compra,
      fecha_venta,
    });

    await sale.save();

    return res.status(200).json({ message: "Compra añadida correctamente" });
    //
  } catch (error) {
    console.error("Error enviar datos:", error);
    return res.status(500).json({ message: "Error enviar datos" });
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({});
    // find busca todos los documentos si se deja vacío

    if (sales.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay ventas en tu portafolio" });
    }

    return res.status(200).json({ sales });
    //
  } catch (error) {
    console.error("Error obtener los datos:", error);
    return res.status(500).json({ message: "Error obtener los datos" });
  }
};

// const deleteSaleById = async (req, res) => {

// }

export default { createNewSale, getAllSales };

##API ENSPOINTS

1.- ACCTIONS
##
POST "/api/action" // Crear nueva acción o añadir compra
##
body:
{
"simbolo": "INTC",
"precio": 30.00,
"cantidad": 2,
"total": 60.00,
"fecha_compra": 
}
##
GET "/api/actions" // Buscar todas las acciones
##
GET "/api/action/:id" // Buscar acción por id
##
PUT "/api/action/:actionId" // Buscar compra y editar valores (id compra, id accion)
##
DELETE "/api/action/:actionId/buy/:buyId" // Buscar compra y eliminar
##
DELETE "/api/action/:id" // Eliminar acción
##
2.- INVESTORS
##
POST "/api/create-investor" // Crear/agregar inversionista
##
body: {
  nombre: { type: String, required: true },
  aporte: { type: Number },
  reinversion: { type: Number },
}
##
GET "/api/investors", investorsController.getAllInvestors); // Buscar todos los inversionistas
##
app.put("/api/investor/:id" // Editar info de un inversionista
##
DELETE "/api/investor/:id" // Borrar un inversionista
##
2.- SALES
##
POST "/api/create-sale" // Crear nueva venta
##
body: {
  simbolo: { type: String, required: true },
  precio_compra: { type: Number, required: true },
  precio_venta: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  fecha_compra: { type: Date, required: true },
  fecha_venta: { type: Date, required: true },
}
##
GET "/api/sales" // Crear nueva venta

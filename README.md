##API ENSPOINTS

1.- ACCTIONS
##
POST "/api/action" // Crear nueva acción o añadir compra
GET "/api/actions" // Buscar todas las acciones
GET "/api/action/:id" // Buscar acción por id
PUT "/api/action/:actionId" // Buscar compra y editar valores (id compra, id accion)
DELETE "/api/action/:actionId/buy/:buyId" // Buscar compra y eliminar
DELETE "/api/action/:id" // Eliminar acción
##
2.- INVESTORS
##
POST "/api/create-investor" // Crear/agregar inversionista
GET "/api/investors", investorsController.getAllInvestors); // Buscar todos los inversionistas
app.put("/api/investor/:id" // Editar info de un inversionista
DELETE "/api/investor/:id" // Borrar un inversionista
##
2.- SALES
##
POST "/api/create-sale" // Crear nueva venta
GET "/api/sales" // Crear nueva venta

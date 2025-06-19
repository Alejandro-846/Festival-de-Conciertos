// FUNCIONES COMO SIMULACIÓN DE system.js (MongoDB 8.x)

// Función: escenariosPorCiudad
function escenariosPorCiudad(ciudad) {
  return db.escenarios.find({ ciudad: ciudad }).toArray();
}
escenariosPorCiudad("Bogotá");

// Función: bandasPorGenero
function bandasPorGenero(genero) {
  return db.bandas.find({ genero: genero, activa: true }).toArray();
}
bandasPorGenero("Electro Tropical");

// TRANSACCIONES SIMULADAS

// COMPRA DE BOLETO: Agregar boleto a Carlos Martínez y reducir capacidad del escenario
db.asistentes.updateOne(
  { nombre: "Carlos Martínez" },
  { $push: { boletos_comprados: { escenario: "Escenario Alterno", dia: "2025-06-22" } } }
);

db.escenarios.updateOne(
  { nombre: "Escenario Alterno" },
  { $inc: { capacidad: -1 } }
);

// REVERSA DE COMPRA: Eliminar boleto y restaurar capacidad
db.asistentes.updateOne(
  { nombre: "Carlos Martínez" },
  { $pull: { boletos_comprados: { escenario: "Escenario Alterno", dia: "2025-06-22" } } }
);

db.escenarios.updateOne(
  { nombre: "Escenario Alterno" },
  { $inc: { capacidad: 1 } }
);

// ÍNDICES Y CONSULTAS

// 1. Índice en bandas.nombre
db.bandas.createIndex({ nombre: 1 });
db.bandas.find({ nombre: "Bomba Estéreo" });

// 2. Índice en presentaciones.escenario
db.presentaciones.createIndex({ escenario: 1 });
db.presentaciones.aggregate([
  { $match: { escenario: "Tarima Caribe" } },
  { $count: "total_presentaciones" }
]);

// 3. Índice compuesto en asistentes.ciudad y edad
db.asistentes.createIndex({ ciudad: 1, edad: 1 });
db.asistentes.find({
  ciudad: "Bogotá",
  edad: { $lt: 30 }
});

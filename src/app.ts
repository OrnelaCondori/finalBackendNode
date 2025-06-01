import express from "express";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuario.routes";
import categoriaRoutes from "./routes/categoria.routes";
import descuentoRoutes from "./routes/descuento.routes";
import detalleRoutes from "./routes/detalle.routes";
import detalleImagenRoutes from "./routes/detalleImagen.routes";
import direccionRoutes from "./routes/direccion.routes";
import imagenRoutes from "./routes/imagen.routes";
import ordenCompraRoutes from "./routes/ordenCompra.routes";
import ordenCompraDetalleRoutes from "./routes/ordenCompraDetalle.routes";
import precioRoutes from "./routes/precio.routes";
import precioDescuentoRoutes from "./routes/precioDescuento.routes";
import productoRoutes from "./routes/producto.routes";
import talleRoutes from "./routes/talle.routes";
import usuarioDireccionRoutes from "./routes/usuarioDireccion.routes";

import authRoutes from "./routes/auth.routes";


dotenv.config();

const app = express();
app.use(express.json());


// Rutas de autenticación
app.use("/auth", authRoutes); 

// Rutas del sistema
app.use("/", usuarioRoutes);
app.use("/", categoriaRoutes);
app.use("/", descuentoRoutes);
app.use("/", detalleRoutes);
app.use("/", detalleImagenRoutes);
app.use("/", direccionRoutes);
app.use("/", imagenRoutes);
app.use("/", ordenCompraRoutes);
app.use("/", ordenCompraDetalleRoutes);
app.use("/", precioRoutes);
app.use("/", precioDescuentoRoutes);
app.use("/", productoRoutes);
app.use("/", talleRoutes);
app.use("/", usuarioDireccionRoutes);

// Rutas de autenticación

export default app;

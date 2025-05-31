-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'CLIENTE');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MASCULINO', 'FEMENINO', 'UNISEX');

-- CreateEnum
CREATE TYPE "tipoProducto" AS ENUM ('ZAPATILLA', 'REMERA', 'BUZO', 'SHORT', 'PANTALON', 'CAMPERA', 'ACCESORIO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" BIGSERIAL NOT NULL,
    "contraseña" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id" BIGSERIAL NOT NULL,
    "pais" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioDireccion" (
    "id" BIGSERIAL NOT NULL,
    "usuario_id" BIGINT NOT NULL,
    "direccion_id" BIGINT NOT NULL,

    CONSTRAINT "UsuarioDireccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "tipoProducto" "tipoProducto" NOT NULL,
    "categoria_id" BIGINT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detalle" (
    "id" BIGSERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "producto_id" BIGINT NOT NULL,
    "talle_id" BIGINT NOT NULL,
    "precio_id" BIGINT NOT NULL,

    CONSTRAINT "Detalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talle" (
    "id" BIGSERIAL NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "Talle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagen" (
    "id" BIGSERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_imagen" (
    "id" BIGSERIAL NOT NULL,
    "detalleId" BIGINT NOT NULL,
    "imagenId" BIGINT NOT NULL,

    CONSTRAINT "detalle_imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descuento" (
    "id" BIGSERIAL NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_final" TIMESTAMP(3) NOT NULL,
    "porcentaje" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "descuento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "precio" (
    "id" BIGSERIAL NOT NULL,
    "precio_compra" DOUBLE PRECISION NOT NULL,
    "precio_venta" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "precio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "precio_descuento" (
    "precioId" BIGINT NOT NULL,
    "descuentoId" BIGINT NOT NULL,

    CONSTRAINT "precio_descuento_pkey" PRIMARY KEY ("precioId","descuentoId")
);

-- CreateTable
CREATE TABLE "orden_compra" (
    "id" BIGSERIAL NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "id_usuario_direccion" BIGINT NOT NULL,

    CONSTRAINT "orden_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orden_compra_detalle" (
    "orden_compra_id" BIGINT NOT NULL,
    "detalleId" BIGINT NOT NULL,

    CONSTRAINT "orden_compra_detalle_pkey" PRIMARY KEY ("orden_compra_id","detalleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDireccion_usuario_id_direccion_id_key" ON "UsuarioDireccion"("usuario_id", "direccion_id");

-- CreateIndex
CREATE INDEX "Producto_categoria_id_idx" ON "Producto"("categoria_id");

-- CreateIndex
CREATE INDEX "Detalle_producto_id_idx" ON "Detalle"("producto_id");

-- CreateIndex
CREATE INDEX "Detalle_talle_id_idx" ON "Detalle"("talle_id");

-- CreateIndex
CREATE INDEX "Detalle_precio_id_idx" ON "Detalle"("precio_id");

-- AddForeignKey
ALTER TABLE "UsuarioDireccion" ADD CONSTRAINT "UsuarioDireccion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioDireccion" ADD CONSTRAINT "UsuarioDireccion_direccion_id_fkey" FOREIGN KEY ("direccion_id") REFERENCES "Direccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_talle_id_fkey" FOREIGN KEY ("talle_id") REFERENCES "Talle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_precio_id_fkey" FOREIGN KEY ("precio_id") REFERENCES "precio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_imagen" ADD CONSTRAINT "detalle_imagen_detalleId_fkey" FOREIGN KEY ("detalleId") REFERENCES "Detalle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_imagen" ADD CONSTRAINT "detalle_imagen_imagenId_fkey" FOREIGN KEY ("imagenId") REFERENCES "imagen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precio_descuento" ADD CONSTRAINT "precio_descuento_precioId_fkey" FOREIGN KEY ("precioId") REFERENCES "precio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precio_descuento" ADD CONSTRAINT "precio_descuento_descuentoId_fkey" FOREIGN KEY ("descuentoId") REFERENCES "descuento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_id_usuario_direccion_fkey" FOREIGN KEY ("id_usuario_direccion") REFERENCES "UsuarioDireccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra_detalle" ADD CONSTRAINT "orden_compra_detalle_orden_compra_id_fkey" FOREIGN KEY ("orden_compra_id") REFERENCES "orden_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra_detalle" ADD CONSTRAINT "orden_compra_detalle_detalleId_fkey" FOREIGN KEY ("detalleId") REFERENCES "Detalle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

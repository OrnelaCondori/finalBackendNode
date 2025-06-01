import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@admin.com';

    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente) {
        console.log(' Ya existe un usuario con ese email');
        return;
    }

    const contraseñaHasheada = await bcrypt.hash('admin123', 10);

    const nuevoAdmin = await prisma.usuario.create({
        data: {
        nombre: 'Admin',
        email: email,
        contraseña: contraseñaHasheada,
        dni: '12345678',
        rol: 'ADMIN', 
        },
    });

    console.log('✅ Admin creado:', nuevoAdmin);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(() => {
        prisma.$disconnect();
});

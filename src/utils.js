// Funciones basicas y generales. Definición de funcionalidades..
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const filename = fileURLToPath(import.meta.url);
export const root = dirname(filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, root + '/public/imgs')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname )
    }
});

export const uploader = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },
    // Para que permita subir solamente imagenes
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Solo se permiten imágenes"), false);
        }
    }
});



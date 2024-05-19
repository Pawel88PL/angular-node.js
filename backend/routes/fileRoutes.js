import express from 'express';
import multer from 'multer';
import { uploadFiles, deleteFile } from '../controllers/fileController.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfiguracja Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/images');
        console.log('Upload path:', uploadPath);
        cb(null, uploadPath); // Folder docelowy dla przesyłanych plików
    },
    filename: function (req, file, cb) {
        // Zachowanie oryginalnej nazwy pliku, w tym rozszerzenia
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit rozmiaru pliku 10 MB
    fileFilter: (req, file, cb) => {
        // Sprawdzenie typu pliku
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Nieprawidłowy format pliku. Tylko obrazy są dozwolone.'), false);
        }
    }
});

router.post('/', upload.array('images'), (req, res, next) => {
    uploadFiles(req, res).catch(next);
});
router.delete('/:id', (req, res, next) => {
    deleteFile(req, res).catch(next);
});

// Globalna obsługa błędów
router.use((err, req, res, next) => {
    console.error('Błąd podczas przesyłania plików:', err);
    res.status(500).json({ error: 'Wystąpił błąd podczas przesyłania plików' });
});

export default router;

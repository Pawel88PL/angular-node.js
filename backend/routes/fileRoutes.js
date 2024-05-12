import express from 'express';
import multer from 'multer';
import { uploadFiles, deleteFile } from '../controllers/fileController.js';

const router = express.Router();

// Konfiguracja Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/public/images/'); // Folder docelowy dla przesyłanych plików
    },
    filename: function (req, file, cb) {
        // Zachowanie oryginalnej nazwy pliku, w tym rozszerzenia
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.array('images'), uploadFiles);
router.delete('/:id', deleteFile);

export default router;

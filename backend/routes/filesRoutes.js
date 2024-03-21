const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/filesController');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/public/images/'); // Folder docelowy dla przesyłanych plików
    },
    filename: function (req, file, cb) {
        // Zachowanie oryginalnej nazwy pliku, w tym rozszerzenia
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post('/', upload.array('images'), fileController.uploadFiles);
router.delete('/:id', fileController.deleteFile);

module.exports = router;

const fs = require('fs');
const path = require('path');

// Folder, w którym będą przechowywane przesłane pliki
const UPLOADS_DIR = 'public/images';

// Funkcja do przesyłania plików
const uploadFiles = async (files) => {
    const uploadedFilesInfo = files.map(file => {
        // Zwracamy względną ścieżkę dostępu do obrazu
        return `/images/${file.filename}`;
    });

    // Zwróć tablicę względnych ścieżek przesłanych plików
    return uploadedFilesInfo;
};

// Funkcja do usuwania plików
const deleteFile = async (filename) => {
    const filePath = path.join(__dirname, UPLOADS_DIR, filename);

    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: 'Plik został usunięty.' });
            }
        });
    });
};

module.exports = {
    uploadFiles,
    deleteFile
};

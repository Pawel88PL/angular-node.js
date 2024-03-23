const fs = require('fs');
const path = require('path');
const { ProductImage } = require('../config/dbConfig');

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
const deleteFile = async (imageId) => {
    try {
        // Najpierw znajdź obrazek w bazie danych
        const image = await ProductImage.findByPk(imageId);

        if (!image) {
            throw new Error('Obrazek nie został znaleziony.');
        }

        // Ścieżka do pliku
        const filePath = path.join(__dirname, '..', 'public', image.imagePath);
        // Usuń plik z systemu plików
        fs.unlinkSync(filePath);

        // Usuń wpis z bazy danych
        await image.destroy();

        return { message: 'Obrazek został usunięty.' };
    } catch (err) {
        console.error('Błąd podczas usuwania obrazka:', err);
        throw err; // Przekaż błąd dalej do obsługi na wyższym poziomie
    }
};


module.exports = {
    uploadFiles,
    deleteFile
};

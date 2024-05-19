import { ProductImage } from '../config/dbConfig.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'images');

export async function uploadImages(files) {
    try {
        const uploadedFilesInfo = files.map(file => {
            const filePath = path.join(UPLOADS_DIR, file.filename);
            const tempPath = file.path;

            fs.renameSync(tempPath, filePath);

            return `/images/${file.filename}`;
        });
        return uploadedFilesInfo;
    } catch (err) {
        console.error('Błąd podczas przesyłania zdjęć:', err);
        throw err;
    }
};

export async function deleteImage(imageId) {
    try {
        const image = await ProductImage.findByPk(imageId);
        if (!image) {
            throw new Error('Obrazek nie został znaleziony.');
        }

        const filePath = path.join(__dirname, '..', 'public', image.imagePath);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.warn('Plik nie istnieje:', filePath);
        }

        await image.destroy();
        return { message: 'Obrazek został usunięty.' };
    } catch (err) {
        console.error('Błąd podczas usuwania obrazka:', err);
        throw err;
    }
};

import { ProductImage } from '../config/dbConfig.js';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = 'public/images';


export async function uploadImages(files) {
    const uploadedFilesInfo = files.map(file => {
        return `/images/${file.filename}`;
    });

    return uploadedFilesInfo;
};

export async function deleteImage(imageId) {
    try {
        const image = await ProductImage.findByPk(imageId);
        if (!image) {
            throw new Error('Obrazek nie został znaleziony.');
        }

        const filePath = path.join(__dirname, '..', 'public', image.imagePath);
        
        fs.unlinkSync(filePath);
        await image.destroy();
        return { message: 'Obrazek został usunięty.' };
    } catch (err) {
        console.error('Błąd podczas usuwania obrazka:', err);
        throw err;
    }
};
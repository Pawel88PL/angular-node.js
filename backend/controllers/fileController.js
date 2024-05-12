import {
    uploadImages,
    deleteImage
} from '../services/fileService.js';

export async function uploadFiles (req, res) {
    try {
        const uploadedFilesInfo = await uploadImages(req.files);
        res.status(200).json({
            message: "Pliki zostały przesłane pomyślnie.",
            files: uploadedFilesInfo
        });
    } catch (error) {
        console.error('Błąd podczas przesyłania plików:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas przesyłania plików.' });
    }
};

export async function deleteFile (req, res) {
    try {
        const { id } = req.params;
        const result = await deleteImage(id);
        res.status(200).send(result);
    } catch (error) {
        console.error('Błąd podczas usuwania obrazka:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas usuwania obrazka.' });
    }
};
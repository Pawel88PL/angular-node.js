const filesService = require('../services/filesService');

exports.uploadFiles = async (req, res) => {
    try {
        // Wywołanie serwisu do przetwarzania przesłanych plików
        const uploadedFilesInfo = await filesService.uploadFiles(req.files);
        res.status(200).json({
            message: "Pliki zostały przesłane pomyślnie.",
            files: uploadedFilesInfo
        });
    } catch (error) {
        console.error('Błąd podczas przesyłania plików:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas przesyłania plików.' });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await filesService.deleteFile(id);
        res.status(200).send(result);
    } catch (error) {
        console.error('Błąd podczas usuwania obrazka:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas usuwania obrazka.' });
    }
};
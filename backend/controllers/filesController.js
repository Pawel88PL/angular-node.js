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
        // Pobranie nazwy pliku z parametrów URL
        const { id } = req.params;
        await filesService.deleteFile(id);
        res.status(200).send({ message: 'Plik został usunięty pomyślnie.' });
    } catch (error) {
        console.error('Błąd podczas usuwania pliku:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas usuwania pliku.' });
    }
};

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 4000;

// Définir le dossier de stockage pour les images (/assets/images)
console.log(__dirname);
console.log(path.join(__dirname, 'View/assets/images'));
// Stocker l'image dans le dossier View/assets/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'View/assets/images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    // Envoyer le chemin de l'image vers le client
    res.send
        ({
            path: req.file.path
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

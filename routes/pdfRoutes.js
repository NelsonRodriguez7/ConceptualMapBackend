const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const pdfController = require('../controllers/pdfController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/upload',verifyToken, 
    (req, res, next) => {
        upload.single('pdf')(req, res, (err) => {
            if (err) {
                
                if (err.code === 'INVALID_FILE_TYPE') {
                    return res.status(400).json({
                        status: {
                            code: 'API4002',
                            error: 'Solo se permiten archivos PDF.'
                        }
                    });
                }
                    return res.status(500).json({
                    status: {
                        code: 'API4003',
                        error: 'Error al subir el archivo.'
                    }
                });
            }
            next();
        });
    }, 
  pdfController.uploadPdf
  );

module.exports = router;
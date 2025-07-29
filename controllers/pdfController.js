const fs = require('fs');
const pdfService = require('../services/pdfService');
const gptService = require('../services/gptService');

const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        status: {
          code: 'API4001',
          description: 'No se subió ningún archivo PDF.'
        } 
      });
    }

    const filePath = req.file.path;

    // Extraer texto del PDF
    const extractedText = await pdfService.extractTextFromPdf(filePath);

    // Eliminar archivo temporal
    fs.unlinkSync(filePath);

    const fragmentos = pdfService.dividirEnFragmentos(extractedText, 4000);

    const resumenes = [];
    for (const fragmento of fragmentos) {
      const resumen = await gptService.resumirChunk(fragmento);
      resumenes.push(resumen);
    }

    const mapaConceptual = await gptService.generarMapaConceptual(resumenes);

    // devolvemos el texto extraído
    res.json({ 
      body: {
        totalFragmentos: fragmentos.length,
        resumenes,
        mapaConceptual
      },
      status: {
        code: 'API0000',
        description: 'Success'
      }
    });

  } catch (error) {
    console.error('Error al procesar el PDF:', error);

    // Intentar limpiar si hubo error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.warn('No se pudo eliminar el archivo temporal:', err.message);
      }
    }

    res.status(500).json({ 
      status:{
        code: 'API4004',
        error: 'Ocurrió un error procesando el archivo PDF.' 
      }
    });
  }
};

module.exports = {
  uploadPdf
};



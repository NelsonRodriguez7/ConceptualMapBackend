const fs = require('fs');
const pdfParse = require('pdf-parse');

const extractTextFromPdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

const dividirEnFragmentos = (texto, maxLength = 4000) => {
  const fragmentos = [];
  let restante = texto;

  while (restante.length > 0) {
    if (restante.length <= maxLength) {
      fragmentos.push(restante.trim());
      break;
    }

    // Buscar el salto de párrafo más cercano antes del límite
    const corte = restante.lastIndexOf('\n\n', maxLength);
    const index = corte > -1 ? corte : maxLength;

    fragmentos.push(restante.slice(0, index).trim());
    restante = restante.slice(index).trim();
  }

  return fragmentos;
};

module.exports = {
  extractTextFromPdf,
  dividirEnFragmentos
};

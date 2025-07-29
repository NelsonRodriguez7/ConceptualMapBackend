const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require('./routes/userRoutes');
const moongose = require("mongoose");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

moongose.connect(process.env.MONGODB).then(() => 
  console.log('Conexion a MongoDB exitosa'))
  .catch((err) => 
    console.log('Conexion fallida a MongoDB', err));

app.use(cors());
app.use(express.json());
app.use('/api/pdf', pdfRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

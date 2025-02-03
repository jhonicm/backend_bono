const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bonoRoutes = require('./routes/bonoRoutes');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use('/api/bonos', bonoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
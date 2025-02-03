const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bonoRoutes = require('./routes/bonoRoutes');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://frontend-bono.vercel.app', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use('/api/bonos', bonoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

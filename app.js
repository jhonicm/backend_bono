const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bonoRoutes = require('./routes/bonoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://frontend-bono.vercel.app', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());


mongoose.connect('mongodb+srv://jhonicm:1234@clustertest.e64rl.mongodb.net/Prueba_Jc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB Atlas');
}).catch(err => {
    console.error('Error de conexión:', err);
});


app.use('/api/bonos', bonoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const generateRouter = require('./routes/generate');

// Conexión a MongoDB
const mongoURI = 'mongodb+srv://<Admin_17>:<tHkjHpD138g0Jy1D>@gencodwhats.4b2amnj.mongodb.net/?retryWrites=true&w=majority&appName=gencodwhats';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para generar código
app.use('/generate', generateRouter);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

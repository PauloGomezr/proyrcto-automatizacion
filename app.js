const express = require('express');
const app = express();
const path = require('path');
const generateRouter = require('./routes/generate');

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

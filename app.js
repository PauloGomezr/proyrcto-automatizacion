const express = require('express');
const app = express();
const path = require('path');
const { MongoClient } = require('mongodb');
const generateRouter = require('./routes/generate');

const username = encodeURIComponent("Admin_17");
const password = encodeURIComponent("tHkjHpD138g0Jy1D");
const cluster = "gencodwhats.4b2amnj.mongodb.net";
const authSource = "gencodwhats";
const authMechanism = "SCRAM-SHA-1";

let uri = `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;

const client = new MongoClient(uri);

async function connectToDB() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error('Error conectándose a MongoDB:', err);
    }
}

connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para generar código
app.use('/generate', generateRouter(client));

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

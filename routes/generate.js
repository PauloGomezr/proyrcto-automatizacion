const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Code = require('/models/Code');

router.post('/', async (req, res) => {
    const { numero, descripcion } = req.body;
    const fileName = `codigo-${numero}.html`;
    const filePath = path.join(__dirname, `../public/generated/${fileName}`);

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enviar Ubicación a WhatsApp</title>
        <script>
            function obtenerUbicacion() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(enviarUbicacion, mostrarError);
                } else {
                    alert("La geolocalización no es soportada por este navegador.");
                }
            }

            function enviarUbicacion(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const mensaje = \`Hola, esta es mi ubicación: https://www.google.com/maps?q=\${lat},\${lon} - ${descripcion}\`;
                const numero = "${numero}";
                window.location.href = \`https://wa.me/\${numero}?text=\${encodeURIComponent(mensaje)}\`;
            }

            function mostrarError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("El usuario negó el permiso para la geolocalización.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("La ubicación no está disponible.");
                        break;
                    case error.TIMEOUT:
                        alert("La solicitud de geolocalización ha expirado.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("Ocurrió un error desconocido.");
                        break;
                }
            }
        </script>
    </head>
    <body onload="obtenerUbicacion()">
        <h1>Enviando ubicación a WhatsApp...</h1>
    </body>
    </html>
    `;

    fs.writeFile(filePath, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al generar el archivo' });
        }

        try {
            const newCode = new Code({
                phoneNumber: numero,
                description: descripcion,
                codeUrl: `/generated/${fileName}`,
            });

            await newCode.save();

            res.status(200).json({ message: 'Archivo generado con éxito', url: `/generated/${fileName}` });
        } catch (error) {
            res.status(500).json({ message: 'Error al guardar en la base de datos' });
        }
    });
});

module.exports = router;

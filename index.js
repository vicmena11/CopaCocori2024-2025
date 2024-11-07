const express = require('express');
const path = require('path');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuración de la base de datos
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Ruta para la página de equipos
app.get('/equipos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/equipos.html'));
});

// Ruta para /resultados
app.get('/resultados', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/resultados.html'));
});

// Ruta para /estadisticas
app.get('/estadisticas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/estadisticas.html'));
});

// Ruta para obtener los equipos desde la base de datos
app.get('/api/equipos', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT nombre, ciudad FROM Equipos');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener equipos:', err);
        res.status(500).send('Error al obtener los equipos');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

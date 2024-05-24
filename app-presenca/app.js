const { version } = require('eslint/lib/linter');
const express = require('express');
const fs = require('fs');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { send } = require('express/lib/response');
const { error } = require('console');

const app = express();

// Set global configuration access ( is it really necessary? )
dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    let estado = '';
    try {
        estado = fs.readFileSync('./log.txt', 'utf8')
    } catch (error) {
        console.log(error);
    }

    res.status(200).send({
        success: 'true',
        message: 'Ultimo estado registrado: ' + estado,
        version: '1.0.0',
    });
});

app.get('/status', (req, res) => {
    const estado = req.query.estado;
    const logfile = fs.createWriteStream('./log.txt');
    logfile.write(estado);
    res.status(200).send({
        success: 'true',
        message: 'Estado recebido: ' + estado,
        version: '1.0.0'
    })
})

// Rotas para JWT

// Gerar token
app.post("/auth/generateToken", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }

    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
})

// Validação de token
app.get("/auth/validateToken", (req, res) => {
    const secret = process.env.JWT_SECRET_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, secret);
        return res.send("Token verificado");
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }

})

app.listen(port);
console.log('Aplicação executando na porta ', port);
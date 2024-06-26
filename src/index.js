const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.use(cors());

app.get('/', (req, res) => {
    const imagePath = path.join(__dirname, 'templates', 'image.html');
    const retryFetchPath = path.join(__dirname, 'templates', 'retryFetch.html');

    res.sendFile(imagePath);
});

app.get('/status200', (req, res) => {
    res.status(200).send('Status 200: OK');
});


app.put('/status200', (req, res) => {
    res.status(200).send('Status 200: OK (PUT)');
});

app.get('/status300', (req, res) => {
    res.status(300).send('Status 300: OK');
});

app.get('/status500', (req, res) => {
    res.status(500).send('Status 500: Internal Server Error');
});

app.put('/status500', (req, res) => {
    res.status(500).send('Status 500: Internal Server Error (PUT)');
});

app.get('/status401', (req, res) => {
    res.status(401).send('Status 401: Unauthorized');
});

app.get('/status403', (req, res) => {
    res.status(403).send('Status 403: Forbidenn');
});

app.get('/image', (req, res) => {
    const imagePath = path.join(__dirname, 'images', `${randomIntFromInterval(1, 3)}.png`);

    res.sendFile(imagePath);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

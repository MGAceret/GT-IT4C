import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

app.get('/info', (req, res) => {
    res.status(200).send('Matthew Gerard P. Aceret, IT4B, BSIT');
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Received ID: ${id}`);
    res.send(`Received ID: ${id}`);
});

app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    console.log(`Hello ${name}!`);
    res.send(`Hello ${name}!`);
});

app.get('/foo', (req, res)  => {
    res.send(`${foo}`);
});



app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
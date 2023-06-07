import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './frontend');
app.use(express.static('frontend'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/idioma', (req, res) => {
    res.render('index');
});

app.get('/paises', (req, res) => {
    res.render('country');
});

app.get('/encuestas', (req, res) => {
    const preguntas = [{
        titulo: "pregunta de ejemplo",
        opciones: ["Si", "No", "No se"]
    }
    ]
    res.render("form", { preguntas })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

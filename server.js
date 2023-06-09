import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './frontend');
app.use(express.static('frontend'));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/idioma', (req, res) => {
    res.render('language');
});

app.get('/secciones', (req, res) => {
    res.render('sections');
});

app.get('/paises', (req, res) => {
    res.render('country');
});

app.get('/encuestas_infraestructura', (req, res) => {
    const data = [
        {
            id: 410,
            question: 'pregunta de ejemplo',
            options: [
                { id: 1, value: 'Si' },
                { id: 2, value: 'No' },
            ],
        },
        {
            id: 412,
            question: 'pregunta de ejemplo',
            options: [
                { id: 1, value: 'Si' },
                { id: 2, value: 'No' },
            ],
        },
    ];
    res.render('form_infraestructura', { data });
});

app.post('/encuestas', (req, res) => {
    console.log(req.body);
});

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

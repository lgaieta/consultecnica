import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './frontend');
app.use(express.static('frontend'));

app.use(express.urlencoded({
    extended: true
}))

app.get('/idioma', (req, res) => {
    res.render("language")
})


app.get('/resultados', (req, res) => {
    const preguntas = [{
        id: 410,
        titulo: "pregunta de ejemplo",
        opciones: ["Si", "No", "No se"]
    }, {
        id: 412,
        titulo: "pregunta de ejemplo2",
        opciones: ["Si", "No", "No se"]
    },
    ]
    res.render("results", { preguntas })
});

app.post("/encuestas", (req, res) => {
    console.log(req.body)
})

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

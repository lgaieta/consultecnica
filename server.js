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
    res.render('country');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

import express from 'express';
import { dbPoolAsync } from './dbPool.js';

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
    if (req.query?.lan === 'pr') res.render('sections_br')
    else res.render('sections');
});

app.get('/paises', (req, res) => {
    if (req.query?.lan === 'pr') res.render('country_br')
    else res.render('country');
});

app.get('/encuestas_infraestructura', async (req, res) => {
    const questions = (await dbPoolAsync.query('select * from question where section_question = 1'))[0]
    let data = questions.map(question => ({ id: question.id_question, question: question.text, options: [] }))

    for (let index = 0; index < data.length; index++) {
        const question = data[index];

        const optionsIds = (await dbPoolAsync.query('select options_id_option from options_has_question where question_id_question = ?', question.id))[0]

        let options = []

        for (let { options_id_option } of optionsIds) {
            const queryData = (await dbPoolAsync.query('select value from options where id_option = ?', options_id_option))[0][0]
            options.push({ id: options_id_option, value: queryData.value })
        }

        data[index] = { ...question, options }
    }
    res.render('form_infraestructura', { data, country: req.query.pais });
});

app.post('/encuestas', async (req, res) => {
    const data = req.body
    const country = data.country;
    delete data.country;

    console.log(country)

    await dbPoolAsync.query(`insert into answer (question_answer, options_answer, country) values ${Object.entries(data).map(([qId, oId]) => '(' + qId + ',' + oId + ',"' + country + '")').join(',')};`)
    res.redirect("/")
});

app.get('/estadisticas_infraestructura', (req, res) => {
    res.render('results')
})

app.get('/', (req, res) => {
    if (req.query?.lan === 'pr') res.render('home_br')
    else res.render('home');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

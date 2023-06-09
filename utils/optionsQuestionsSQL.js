import mysql2 from 'mysql2';

const pool = mysql2.createPool({
    host: "localhost",
    port: "3307",
    database: "contec",
    user: "root",
    password: "1234"
})

const poolAsync = pool.promise()

const optionsQuestionsSQL = async (text) => {
    const questionsWithAnswers = text.split("-")
    
    questionsWithAnswers.forEach(async (questionWithAnswers) => {
        const lines = questionWithAnswers.split("\n")
        let question = ""
        let options = []
        lines.forEach((line, index) => {
            if (index === 0) question = line
            else if (line[0] !== "" && line.length > 1) options.push(line)
        })
        const questionId = (await poolAsync.query("select id_question from question where text = ?", [question]))[0]
        console.log(questionId)
    }
    )


    // const data = await poolAsync.query("select * from question")
    // console.log(data[0])
}

optionsQuestionsSQL(`-¿Cómo considera la calidad y cantidad de materiales que ofrece su institución?
Muy mala
Mala
Aceptable
Buena
Muy buena

-¿Cuenta su centro educativo con conexión a internet?
Si
No

-¿Cómo describiría la calidad de la conexión?
Muy mala
Mala
Aceptable
Buena
Muy buena

-¿Cómo evaluaría la seguridad de su institución?
Muy mala
Mala
Aceptable
Buena
Muy buena

-Describa el nivel de higiene y calidad de los baños en su centro de estudio.
Muy mala
Mala
Aceptable
Buena
Muy buena

-¿Cómo calificas la condición edilicia de tu institución?
Muy mala
Mala
Aceptable
Buena
Muy buena`)
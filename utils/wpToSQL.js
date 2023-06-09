const whatsappToSQL = (text) => {
    const lines = text.split("\n")
    const questions = []
    let options = []

    lines.forEach(line => {
        if (line[0] === "-") questions.push(line.slice(1))
        else if (line[0] !== "" && line.length > 1) options.push(line) 
    })

    options = new Set(options)

    let questionsQuery = "insert into question (`text`, section_question) values "

    questions.forEach(question => {questionsQuery += `("${question}", 1),`})

    questionsQuery = questionsQuery.slice(0, -1) + ";"

    let optionsQuery = "insert into `options` (`value`) values "

    options.forEach(option => {optionsQuery += `("${option}"),`})

    optionsQuery = optionsQuery.slice(0, -1) + ";"

    console.log(questionsQuery)
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(optionsQuery)

}

whatsappToSQL(`-¿Cómo considera la calidad y cantidad de materiales que ofrece su institución?
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
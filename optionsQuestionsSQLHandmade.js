const sql = (idQuestion, options) => `insert into options_has_question (options_id_option, question_id_question) values ${options.map(option => "(" + idQuestion + "," + option + ")").join(",")};`

console.log(sql(1, [1, 2, 3, 4, 5]))
console.log(sql(2, [6, 7]))
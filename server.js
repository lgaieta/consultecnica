import express from "express";
import { getQuestions } from "./getQuestions.js";
import { dbPoolAsync } from "./dbPool.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./frontend");
app.use(express.static("frontend"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/idioma", (req, res) => {
  res.render("language");
});

app.get("/secciones", (req, res) => {
  if (req.query?.lan === "pr") res.render("sections_br");
  else res.render("sections");
});

app.get("/paises", (req, res) => {
  if (req.query?.lan === "pr") res.render("country_br");
  else res.render("country");
});

app.get("/encuestas_infraestructura", async (req, res) => {
  const data = await getQuestions();
  res.render("form_infraestructura", { data, country: req.query.pais });
});

app.post("/encuestas", async (req, res) => {
  const data = req.body;
  const country = data.country;
  delete data.country;

  console.log(country);

  await dbPoolAsync.query(
    `insert into answer (question_answer, options_answer, country) values ${Object.entries(
      data
    )
      .map(([qId, oId]) => "(" + qId + "," + oId + ',"' + country + '")')
      .join(",")};`
  );
  res.redirect("/");
});

app.get("/estadisticas_infraestructura", async (req, res) => {
  const questions = await getQuestions();
  let data = [];

  for (const question of questions) {
    const values = [];
    const labels = question.options.map((option) => option.value);
    for (const option of question.options) {
      const amount = (
        await dbPoolAsync.query(
          "select count(*) from answer where question_answer = ? and options_answer = ?",
          [question.id, option.id]
        )
      )[0][0];
      values.push(amount["count(*)"]);
    }
    data.push({ ...question, labels: JSON.stringify(labels), values });
  }
  res.render("results", { data });
});

app.get("/", (req, res) => {
  if (req.query?.lan === "pr") res.render("home_br");
  else res.render("home");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

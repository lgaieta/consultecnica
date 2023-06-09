use contec;

alter table answer
add country varchar(10);

insert into section (name) values ("Infraestructura");

select * from section;
select * from question;

insert into question (`text`, section_question) values ("¿Cómo considera la calidad y cantidad de materiales que ofrece su institución?", 1),("¿Cuenta su centro educativo con conexión a internet?", 1),("¿Cómo describiría la calidad de la conexión?", 1),("¿Cómo evaluaría la seguridad de su institución?", 1),("Describa el nivel de higiene y calidad de los baños en su centro de estudio.", 1),("¿Cómo calificas la condición edilicia de tu institución?", 1);

insert into options (`value`) values ("Muy mala"),("Mala"),("Aceptable"),("Buena"),("Muy buena"),("Si"),("No");

select * from options;

insert into options_has_question (question_id_question, options_id_option) values (1,1),(1,2),(1,3),(1,4),(1,5);
insert into options_has_question (question_id_question, options_id_option) values (2,6), (2, 7);
insert into options_has_question (question_id_question, options_id_option) values (3,1),(3,2),(3,3),(3,4),(3,5);
insert into options_has_question (question_id_question, options_id_option) values (4,1),(4,2),(4,3),(4,4),(4,5);
insert into options_has_question (question_id_question, options_id_option) values (5,1),(5,2),(5,3),(5,4),(5,5);
insert into options_has_question (question_id_question, options_id_option) values (6,1),(6,2),(6,3),(6,4),(6,5);

select * from options_has_question;

select * from answer;

select count(id_answer) from answer where options_answer = 1 and question_answer = 1;
use contec;

insert into section (name) values ("Infraestructura");

select * from section;
select * from question;

insert into question (`text`, section_question) values ("¿Cómo considera la calidad y cantidad de materiales que ofrece su institución?", 1),("¿Cuenta su centro educativo con conexión a internet?", 1),("¿Cómo describiría la calidad de la conexión?", 1),("¿Cómo evaluaría la seguridad de su institución?", 1),("Describa el nivel de higiene y calidad de los baños en su centro de estudio.", 1),("¿Cómo calificas la condición edilicia de tu institución?", 1);

insert into options (`value`) values ("Muy mala"),("Mala"),("Aceptable"),("Buena"),("Muy buena"),("Si"),("No");

select * from options;

insert into options_has_question (question_id_question, options_id_option) values (1,1),(1,2),(1,3),(1,4),(1,5);
insert into options_has_question (question_id_question, options_id_option) values (2,6), (2, 7);

select * from options_has_question;
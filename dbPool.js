import mysql2 from "mysql2";

export const dbPool = mysql2.createPool({
  host: "localhost",
  port: "3307",
  database: "contec",
  user: "root",
  password: "982006",
});

export const dbPoolAsync = dbPool.promise();

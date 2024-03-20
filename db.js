import 'dotenv/config'
import postgres from "postgres";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const db = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Isso é opcional, dependendo da configuração do seu banco de dados
  },
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export const sql = db; 
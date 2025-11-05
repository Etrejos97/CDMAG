import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const getConnection = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Conectado a SQL Server");
    return pool;
  })
  .catch((err) => console.log("Error de conexion: ", err));

export { sql, getConnection };
export default config;

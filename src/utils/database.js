// ini untuk koneksi ke db
import pkg from 'pg';
import dotenv from "dotenv";


dotenv.config()

const { Pool } = pkg
// Pool utk app yg sering akses db

export const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGUSER,
    password: process.env.PGDATABASE,
    port: process.env.PGPORT
})
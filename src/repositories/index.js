import { pool } from '../utils/database.js';
import { validateTable } from '../middlewares/Validasi.js';
import bcrypt from 'bcrypt'


//Repo
class Repositories {
  
  async create(tabel, body){
    validateTable(tabel)
    const keys = Object.keys(body);
    const values = Object.values(body);
    const kolom = keys.join(',');
    const valuePlaceholder = keys.map((_,i)=>`$${i + 1}`).join(', ');

    const kueri = {
      text:`INSERT INTO ${tabel} (${kolom}) VALUES (${valuePlaceholder}) RETURNING *`,
      values
    }

    const res = await pool.query(kueri)
    return res.rows[0];
  }
  async read(tabel, id=''){
    validateTable(tabel)
    if (typeof(id) === 'object') {
      const { email, password } = id
      const query = {
        text: `SELECT * FROM ${tabel} WHERE email = $1`,
        values: [email]
      };
      const result = await pool.query(query);
      const user = result.rows[0];

      if (!user) {
        return null;
      }
      const verifyPass = await bcrypt.compare(password,user.password);

      if (!verifyPass) {
        return null;
      }

      return user.id;
    }


    if (id) {
      const query = {
        text: `SELECT * FROM ${tabel} WHERE id = $1`,
        values: [id]
      };
      const result = await pool.query(query);
      return result.rows[0];
    }

    const query = `SELECT * FROM ${tabel}`;
    const result = await pool.query(query);
    return result.rows;
  }

  async readSpecific(tabel, data){
    const { param, id } = data
  
    const query = {
        text: `SELECT * FROM ${tabel} WHERE ${param} = $1`,
        values: [id]
      };
      const result = await pool.query(query);
      return result.rows;
  }

  async update(tabel, id, body){
    validateTable(tabel)
    const keys = Object.keys(body);
    const values = Object.values(body);

    const setQuery = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const kueri = {
      text:`UPDATE ${tabel} SET ${setQuery} WHERE id = $${keys.length + 1} RETURNING *`,
      values:[...values, id]
    }

    const res = await pool.query(kueri)
    return res.rows[0]
    
  }
  async delete(tabel, id){
    validateTable(tabel)
    
    if (tabel === 'authentications') {
       const query = {
        text: `
          DELETE FROM ${tabel}
          WHERE token = $1
        `,values: [id]
      };
      
      const result = await pool.query(query);
      return result.rows[0];
    }

    if (tabel === 'bookmarks' && typeof(id) === 'object') {
      const { user_id, job_id } = id
      const query = {
        text: `
          DELETE FROM ${tabel}
          WHERE user_id = $1 AND job_id = $2
          RETURNING id
        `,values: [user_id, job_id]
      };
      const hasil = await pool.query(query);
      return hasil.rows[0]
    }

    //normal delete
    const query = {
      text: `
        DELETE FROM ${tabel}
        WHERE id = $1
        RETURNING id
      `,
      values: [id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
}

export default new Repositories();
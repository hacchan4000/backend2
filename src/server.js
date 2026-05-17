// ini untuk jalanin / entry point server
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();
 
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';


app.listen(PORT , ()=> {
  console.log(`Server running at http://${HOST}:${PORT}`);
})

  
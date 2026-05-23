import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt'
import Repositories from "../repositories/index.js";

//services
export const ApiServices = {
  Register: async (path, body)=>{

    const data = { ...body}
    data.id = nanoid(16)

    if (data.password) { data.password =await bcrypt.hash(data.password,10); }
    const hasil = await Repositories.create(path, data)
    delete hasil.password;
    return hasil 
  },
  
  Search: async (tabel, data)=>{
    if (data?.param) {
      return await Repositories.readSpecific(tabel, data)
    }
    return await Repositories.read(tabel, data)
  },
  List: async (tabel)=>{
    return await Repositories.read(tabel)
  },
  Update:async(tabel, id, body)=>{
    return await Repositories.update(tabel, id, body)
  },
  Delete:async(tabel, id)=>{
    return await Repositories.delete(tabel, id)
  },
}


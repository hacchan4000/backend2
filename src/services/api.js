import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt'
import Repositories from "../repositories/index.js";

//services
export const ApiServices = {
  Register: async (path, body)=>{

    const data = { ...body}
    data.id = nanoid(16)

    data.password || (data.password = await bcrypt.hash(data.password,10));

    return await Repositories.create(path, data)
  },
  
  Search: async (tabel, id)=>{
    return await Repositories.read(tabel, id)
  },
  List: async (tabel)=>{
    return await Repositories.read(tabel)
  },
  Update:async(tabel, id)=>{
    return await Repositories.update(tabel, id)
  },
  Delete:async(tabel, id)=>{
    return await Repositories.delete(tabel, id)
  },
}


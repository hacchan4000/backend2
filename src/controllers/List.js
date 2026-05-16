import { ApiServices } from "../services/api.js"


export const listAll = async (req, res, next) => {
  const path = req.path.split('/')[1]
  
  const hasil = await ApiServices.List(path)
}
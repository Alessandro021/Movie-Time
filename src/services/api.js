import axios from "axios"
//BASE: https://api.themoviedb.org/3/
//Key: api_key=2f80d2c6cee2d978397b2ef6c5ba08a0
//movie/now_playing?api_key=2f80d2c6cee2d978397b2ef6c5ba08a0&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;
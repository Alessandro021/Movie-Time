import { useState, useEffect } from "react"
import api from "../../services/api";

// Url da API: movie/now_playing?api_key=2f80d2c6cee2d978397b2ef6c5ba08a0&language=pt-BR

//https://api.themoviedb.org/3/movie/now_playing?api_key=2f80d2c6cee2d978397b2ef6c5ba08a0&language=pt-BR

export default function Home(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("/movie/now_playing",{
                params:{
                    api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                    language: "pt-BR",
                    page: 1,
                }
            })
            setFilmes(response.data.results.slice(0,10))
        }

        loadFilmes()
    },[])
    return(
        <div className="container">
            <h1>Tela de Home</h1>
        </div>
    )
}

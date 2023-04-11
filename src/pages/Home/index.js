import { useState, useLayoutEffect } from "react"
import api from "../../services/api";
import './home.css'

import { Link } from "react-router-dom";


export default function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        async function loadFilmes(){
            const response = await api.get("/movie/now_playing",{
                params:{
                    api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                    language: "pt-BR",
                    page: 1,
                }
            })
            setFilmes(response.data.results.slice(0,20))
            setLoading(false)
        }

        loadFilmes()
    },[])

    return(
        loading ? (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
            ) : (
            <div className="container">
                <div className="lista-filmes">
                    {filmes.map((filme) => (
                        <article key={filme.id}>
                            <strong >{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar Filme</Link>
                        </article>
                    ))}
                </div>
            </div>
        )
    )
}

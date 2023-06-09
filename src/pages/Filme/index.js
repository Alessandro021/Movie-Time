import { useState, useLayoutEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import api from '../../services/api.js'

import './filme.css'

export default function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                navigate("/", { replace: true})
                return;
            })
        }

        loadFilme()

        return () => {

        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@FILME");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id )

        if(hasFilme){
            toast.warn("Esse filme já esta salvo na sua lista.")
            return;
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@FILME", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }
    return(
        !loading ? (
            <div className="filme-info">
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />

                <h3>Sinopse</h3>
                <span>{filme.overview ? filme.overview : "Ainda não esta disponivel a sinopse desse filme."}</span>
                <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

                <div className="area-buttons">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                    </button>
                </div>
            </div>
        ) : (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    )
}
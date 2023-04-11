import { useState, useLayoutEffect } from "react"
import { Link } from "react-router-dom";
import "./favoritos.css"

export default function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useLayoutEffect(()=> {
        const minhaLista = localStorage.getItem("@FILME")
        setFilmes(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=> {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)

        localStorage.setItem("@FILME", JSON.stringify(filtroFilmes))
    }
    return(
        <div className="meus-filmes">
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span> Você não possui nenhum filme salvo :(</span>}

            <ul>
                {filmes.map((item) => (
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
import {React, useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";
import { Historico } from '../../api';
// "proxy": "http://localhost:3001",

export default function Ranking() {
    const [historico, setHistorico] = useState([]);
    
    
useEffect(() => {
    getHistorico();
    const atualizacao = (setInterval(getHistorico,5000));
    return () => clearInterval(atualizacao);
  
  },[]);
  
  const getHistorico = async() => {
    const response = await Historico();
    setHistorico(response);
  } 

    return(
        <>
            <header>
                <button>
                    <Link to="/PlacarPage">Voltar</Link>    
                </button>
            </header>
            <h1> Ranking </h1>
            <table>
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Nome</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>
                <tbody>
                    {historico.map((item, index) => (
                        <tr key={index}> 
                            <td> {index + 1} </td>
                            <td> {item.nome} </td>
                            <td> {item.pontuacao} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
    
};

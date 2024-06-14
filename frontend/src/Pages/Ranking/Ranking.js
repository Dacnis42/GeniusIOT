// import {React, useEffect, useState, useRef} from "react";
// import { Link } from "react-router-dom";
// import { Historico } from '../../api';
// // "proxy": "http://localhost:3001",

// export default function Ranking() {
//     const [historico, setHistorico] = useState([]);
    
    
// useEffect(() => {
//     getHistorico();
//     const atualizacao = (setInterval(getHistorico,5000));
//     return () => clearInterval(atualizacao);
  
//   },[]);
  
//   const getHistorico = async() => {
//     const response = await Historico();
//     setHistorico(response);
//   } 

//     return(
//         <>
//             <header>
//                 <button>
//                     <Link to="/PlacarPage">Voltar</Link>    
//                 </button>
//             </header>
//             <h1> Ranking </h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Posição</th>
//                         <th>Nome</th>
//                         <th>Pontuação</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {historico.map((item, index) => (
//                         <tr key={index}> 
//                             <td> {index + 1} </td>
//                             <td> {item.nome} </td>
//                             <td> {item.pontuacao} </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
    
// };

import React, { useEffect, useState } from 'react';
import { Historico } from '../../api'; // ajuste o caminho conforme necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button , Table} from 'reactstrap';


const Ranking = () => {
  const [pontos, setPontos] = useState([]);

  useEffect(() => {
    const fetchPontos = async () => {
      const data = await Historico();
      console.log('Dados recebidos no componente:', data); // Verifique os dados no componente
      if (data) {
        setPontos(data);
      }
    };

    fetchPontos();
  }, []);

  return (

    <div className="App">
            <h1 style={{ textAlign: 'center', marginTop: '25px' }}>Ranking do Genius SENAI</h1>
            <br />
            <Table light>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>
                <tbody>
                    {pontos.map((ponto, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ponto.NICKNAME}</td>
                            <td>{ponto.PONTUACAO}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button a href='/'>
              Voltar
            </Button>
            </div>
    // <div>
    //   <h1>Pontuação</h1>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Posição</th>
    //         <th>Nome</th>
    //         <th>Pontuação</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {pontos.map((ponto, index) => (
    //         <tr key={index}>
    //           <td>{index + 1}</td>
    //           <td>{ponto.NICKNAME}</td>
    //           <td>{ponto.PONTUACAO}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <a href="/">Voltar</a>
    // </div>
  );
};

export default Ranking;

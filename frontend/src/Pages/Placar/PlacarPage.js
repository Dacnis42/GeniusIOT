import React, {  useState } from 'react';
// import { Link } from "react-router-dom";
// import mqtt from "../../backend/"
// import Rotas from './routes';
import './style.css';

function App() {
  const [pontuacao, setPontuacao] = useState(0);
  const [pontuacaoAlta, setPontuacaoAlta] = useState(0);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);


  const resetarPontuacao = () => {
    setPontuacao(0);
    setPontuacaoAlta(0);
  };

  const mostrarHistoricoPontuacao = () => {
    setMostrarHistorico(true);
  };

  const esconderHistoricoPontuacao = () => {
    setMostrarHistorico(false);
  };

  // const resetarHistorico = () => {
  //   setHistorico([]);
  // };

  return (
    <div className="App">
      <div className="background"></div>
      <div className="content">
        <h1>Jogo Genius</h1>
        <div className="scoreboard">
          <h2>Placar</h2>
          <div className="score">Pontuação: {pontuacao}</div>
          <div className="high-score">Pontuação Alta: {pontuacaoAlta}</div>
          <div className="buttons">
            <button onClick={resetarPontuacao}>Resetar Placar</button>
            <button onClick={mostrarHistoricoPontuacao}>Ver Histórico</button>
            {/* <button>
              <Link to="/Ranking">Ver Ranking</Link>
            </button> */}
          </div>
        </div>
        {mostrarHistorico && (
          <div className="historico">
            <h2>Histórico de Pontuações</h2>
            {/* <ul>
              {historico.map((pontuacao, index) => (
                <li key={index}>Pontuação {index + 1}: {pontuacao}</li>
              ))}
            </ul> */}
            {/* <button onClick={resetarHistorico}>Resetar Histórico</button> */}
            <button onClick={esconderHistoricoPontuacao}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
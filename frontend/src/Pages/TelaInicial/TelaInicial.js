// import React, { useState } from 'react';
// import CadastroPage from '../../CadastroPage';
// import PlacarPage from '../../PlacarPage';


// export default function TelaInicial() {
//   const [nomeJogador, setNomeJogador] = useState('');
//   const [mostrarPlacar, setMostrarPlacar] = useState(false);

//   const handleCadastroSubmit = (nome) => {
//     setNomeJogador(nome);
//     console.log('Nome do jogador:', nome);
//     setMostrarPlacar(true);
//   };


//   return (
//     <div>
//       {mostrarPlacar ? (
       
//         <PlacarPage nomeJogador={nomeJogador} />
//       ) : (
       
//         <CadastroPage onSubmit={handleCadastroSubmit} />
//       )}
//     </div>
//   );
// };
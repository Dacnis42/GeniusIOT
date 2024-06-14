// import React, { useState } from 'react';
// import { registrarNome } from '../../api';
// import './styless.css';


// function CadastroPage() {
//   const [nome, setNome] = useState('');

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   onSubmit(nome);
//   // };

//   const handleRegistro = async (e) => {
//     e.preventDefault();
//     await RegistrarNome({nome});
//     window.location.href = '/PlacarPage';
//     console.log(nome);
// }


//   return (
//     <div className="form-container">
//       <h2>Cadastro</h2>
//       <form onSubmit={handleRegistro}>
//         <label>
//           <input
//             type="text"
//             value={nome}
//             onChange={(event) => setNome(event.target.value)}
//             placeholder="Informe o seu nome para começar o jogo"
//           />
//         </label>
//         <button type='submit'>Enviar</button>
//       </form>
//     </div>
//   );
// }

// export default CadastroPage;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import { registrarNome } from '../../api';
import './styless.css'; 


function CadastroPage() {
  const [nickname, setNickname] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    setNickname(nickname)

    await registrarNome({ nickname});
    setNickname('');
  };  

  return (
    
    <div className="App">
      <h1>Digite o seu nome para iniciar o jogo!</h1>
      <Form className="form-centered col-md-12" onSubmit={handleRegistration}>
        <FormGroup>
          <Label for="exampleName" hidden>
            Nome
          </Label>
          <Input
            style={{ marginTop: '60px' }}
            id="exampleName"
            placeholder="informe o nome"
            value={nickname}
            type="text"
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormGroup>
        <Button color='warning' type="submit">
          Enviar
        </Button>
        <Button color='warning' href="/Ranking" style={{ marginLeft: '20px' }}>
          Ranking
        </Button>
      </Form>
    </div>
    
  );
}

export default CadastroPage;
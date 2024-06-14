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


function CadastroPage() {
  const [nickname, setNickname] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    const nicknameTratada = nickname.trim().replace(/\s+/g, ' ');
    setNickname(nickname.trim().replace(/\s+/g, ' '));
    if (nicknameTratada.length < 3) {
      alert("Mínimo de 3 caracteres para o nickname!");
      return;
    }

    await registrarNome({ nickname: nicknameTratada });
    setNickname('');
  };  

  return (
    
    <div className="App">
      <h1>Informe o seu nickname para iniciar!</h1>
      <Form className="form-centered col-md-7" onSubmit={handleRegistration}>
        <FormGroup>
          <Label for="exampleName" hidden>
            Nome
          </Label>
          <Input
            style={{ marginTop: '60px' }}
            id="exampleName"
            placeholder="nickname (min 3 caracteres)"
            value={nickname}
            type="text"
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">
          Enviar
        </Button>
        <Button href="/Ranking" style={{ marginLeft: '20px' }}>
          Classificação
        </Button>
      </Form>
    </div>
    
  );
}

export default CadastroPage;
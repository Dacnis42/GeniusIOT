// export const RegistrarNome = async (nome) => {
//     await fetch ("/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({nome}),
//     });
    
// }
export const registrarNome = async (nome) => {
    await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nome),
    })
  }
  

export const Historico = async (pontuacao) => {
    const pontos = await fetch ("/pontuacao");
    return Response.json();
    
}


// (async () => {
//       const database = require('./db');
//       const express = require('express');
//       const client = require('./mqtt');
//       const app = express();
//       const port = 3001;
//       const cors = require('cors');


//       //midlewere parse jason
//       app.use(cors());
//       app.use(express.json());

      
      
//       app.get('/pontuacao', async (req, res) => {
       
//         const [ponto] = await database.query("SELECT PONTUACAO FROM JOGADOR ORDER BY PONTUACAO DESC");
//         // SELECT * FROM PLACAR INNER JOIN JOGADOR ON PLACAR.ID_DO_JOGADOR = JOGADOR.ID_JOGADOR ORDER BY PONTUACAO DESC
        
//         res.json(ponto);
      
//       });
    
//       app.post('/', async (req, res) => {
//         const { nome } = req.body;
//         const topic_nome = 'Equipe_genius/NOME';
//         try {
//             client.publish(topic_nome, `${nome}`, { qos: 0, retain: false }, (error) => {
//                 if (error) {
//                 console.error(error)
//                 }
//             })
//         }   
//         catch (error) {
//             console.error(error);
//             res.status(500).send('Erro ao buscar nome');
//         }
//     })
      
//       // try{
//       //   app.post('/', async (req,res) => {
//       //     const {nome} = req.body; 
//       //     const topic_nome = 'Equipe_genius/NOME';
//       //     client.publish(topic_nome, `${nome}`, {qos :0, retain:false}, (error) => {
//       //       if (error){
//       //         console.error(error);
//       //       }
//       //     }
//       //     );
//       //   })
//       // }
//       // catch(error) {
//       //   console.error(error);
//       //   res.status(500);
//       // }

//       /*MQTT GRAVANDO NO BANCO
      
//         mqtt + sequelize

//       */

//     //Conectando
//       const topic = 'Equipe_genius/PLACAR'
//       client.on('connect', () => {
//         console.log('Connected')
//         client.subscribe([topic], () => {
//           console.log(`Subscribe to topic '${topic}'`)
//         })
//       })

//       // const topic_nome = 'Equipe_genius/NOME'
//       // mqtt.on('connect', () => {
//       //   console.log('Connected')
//       //   mqtt.subscribe([topic_nome], () => {
//       //     console.log(`Subscribe to topic '${topic_nome}'`)
//       //   })
//       // })


//       /* Callback para inserir quando receber uma mensagem nova via MQTT*/ 
//       client.on('message', async (topic, payload) => {
//         console.log('Received Message:', topic, payload.toString());

//       })

//       client.on('message', async (topic, payload) => {
//         console.log('Received Message:', topic, payload.toString());
//         const split = payload.toString().split(",");
//         const nome = split[0];
//         const pontuacao = parseInt(split[1]);
//         try {
//             await database.query('INSERT INTO classificacao (nome, pontuacao) VALUES (?, ?)', [nome, pontuacao]);
//         }
//         catch (error) {
//             console.error(error);
//         }
//     });

//       // client.on('message', async(topic, payload) => {
//       //   const nome = payload.toString();
//       //   console.log("")
//       //   // await database.query("INSERT INTO JOGADOR (NICKNAME) VALUES (?)", [nome]);

//       // })

//       client.on('message', async(topic, payload) => {
//         const pontuacao = payload.toString();
//         console.log("Mensagem", topic, payload.toString());
//         await database.query("INSERT INTO JOGADOR (PONTUACAO) VALUES (?)", [pontuacao]);

//       })

//       /*Iniciando o servidor */

//      app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

//   }

// )();


(async()=>{

  const express = require('express');
  const app = express();
  const db = require('./db');
  const client = require('./mqtt');
  const port = 3001;

  app.use(express.json());
  //Coleta as informações dos jogadores no banco de dados
  app.get('/ranking', async (req, res) => {
      try {
          const [ranking] = await db.query('SELECT * FROM JOGADOR order by pontuacao desc');
          res.json(ranking);
      }
      catch (error) {
          console.error(error);
          res.status(500).send('Erro ao buscar ranking');
      }
  })
  //Envio do nick do jogador para o MQTT
  app.post('/', async (req, res) => {
      const { nickname } = req.body;
      const topic = 'Equipe_genius/NOME';
      try {
          client.publish(topic, `${nickname}`, { qos: 0, retain: false }, (error) => {
              if (error) {
              console.error(error)
              }
          })
      }   
      catch (error) {
          console.error(error);
          res.status(500).send('Erro ao buscar nome');
      }
  })
  //Conexão no MQTT
  const topic = 'Equipe_genius/PLACAR';
  client.on('connect', () => {
      console.log('Connected');
      client.subscribe([topic], () => {
          console.log(`Subscribe to topic '${topic}'`);
      });
  
  });
  //Envio das informações da partida para o banco de dados
  client.on('message', async (topic, payload) => {
      console.log('Received Message:', topic, payload.toString());
      const split = payload.toString().split(",");
      const nome = split[0];
      const pontuacao = parseInt(split[1]);
      try {
          await db.query('INSERT INTO JOGADOR (nickname, pontuacao) VALUES (?, ?)', [nome, pontuacao]);
      }
      catch (error) {
          console.error(error);
      }
  });

  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
}
)();










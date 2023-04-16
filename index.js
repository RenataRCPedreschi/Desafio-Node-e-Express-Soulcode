const express = require("express");
const app = express();
const fs = require('fs');
/* const path = require("path") */
app.use(express.json());



/* Desafio 4: Pesquise e aplique o logger morgan na aplicação */
const morgan = require('morgan');
const accessLogStream = fs.createWriteStream('server.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));



const alunos = require("./alunos");

/* Crie uma rota GET para “/alunos” que lista todos os alunos. Deve conter query opcional para filtrar por nome e por média. Ou seja, a rota pode ter este formato: “/alunos?nome=pedro”, “/alunos?media=7.5” ou esse “/alunos”. Esta rota deve utilizar as funções exportadas pelo módulo alunos.js; */
app.get("/alunos", (req, res) => {
  const { nome, media } = req.query;
  res.json(alunos);
});

/* Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média). Valide os campos passados e caso contrário indique um erro (400); */


/* REFATORADO em alunos.js */
app.post("/alunos/novo", (req, res) => {
  const { nome, matricula, media } = req.body;
  if (nome !== undefined && matricula !== undefined && media !== undefined) {
    res.json(`Nome: ${nome}, Matricula: ${matricula}, Media: ${media}`);
  } else {
    res.status(404).json({ message: "Dados inválidos" });
  }
});


/* Desafio 2: Substituir as rotas POST de atualizar e deletar com os métodos PUT e DELETE respectivamente, reformulando as URLs para todas utilizarem o mesmo caminho /alunos, mudando apenas o método utilizado;  */

//ATUALIZAR
app.put("/alunos/atualizar/:index", (req, res) => {
  const index = req.params.index; 
  const { nome, media } = req.body;

  alunos[index] = {
    nome: nome || alunos[index].nome, 
    media: media || alunos[index].media, 
  };
  res.send("Aluno atualizado com sucesso!");

  if (index < 0 || index >= alunos.length) {
    return res.status(404).send("Aluno não encontrado");
  }
});

//DELETAR
app.delete("/alunos/deletar/:index", (req, res) => {
    const index = Number(req.params.index);
  
    if (index > 0 && index < alunos.length) {
      alunos.slice(index, 1);
      res.json({ message: "Aluno removido!" });
    } else {
      res.status(404).json({ message: "Aluno não encontrado" });
    }
  });



  

/* Código antigo */

/* Crie uma rota POST para “/alunos/deletar/:index” que indica qual aluno remover do array de dados (index). Trate a chamada se o aluno não existir (404); */

/* Refatoração abaixo desafio 2 */

/* app.post("/alunos/deletar/:index", (req, res) => {
  const index = Number(req.params.index);

  if (index > 0 && index < alunos.length) {
    alunos.slice(index, 1);
    res.json({ message: "Aluno removido!" });
  } else {
    res.status(404).json({ message: "Aluno não encontrado" });
  }
}); */

/* Crie uma rota POST para /alunos/atualizar/:index, que no corpo da requisição recebe um objeto (nome, média) e atualiza os dados do aluno naquela posição. Trate a chamada se o aluno não existir (404); */

/* app.post("/alunos/atualizar/:index", (req, res) => {
  const { nome, media } = req.body;
  const index = req.params.index;

  if (index >= 0 && index < alunos.length) {
    alunos[index].nome = nome;
    alunos[index].media = media;
    res.json({ message: "Aluno atualizado com sucesso" });
  } else {
    res.status(404).json({ message: "Aluno não encontrado!" });
  }
}); */










app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});

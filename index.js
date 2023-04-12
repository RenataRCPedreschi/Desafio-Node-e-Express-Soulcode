const express = require("express");
const app = express();
app.use(express.json());

const alunos = require("./alunos");

/* Crie uma rota GET para “/alunos” que lista todos os alunos. Deve conter query opcional para filtrar por nome e por média. Ou seja, a rota pode ter este formato: “/alunos?nome=pedro”, “/alunos?media=7.5” ou esse “/alunos”. Esta rota deve utilizar as funções exportadas pelo módulo alunos.js; */
app.get("/alunos", (req, res) => {
const {nome, media} = req.query;
res.send(`Nome: ${nome}, Média: ${media}`)
});

/* Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média). Valide os campos passados e caso contrário indique um erro (400); */

app.post("/alunos/novo", (req, res) => {
    const {nome, matricula, media} = req.body;
    if((nome !== undefined) && (matricula !== undefined) && (media !== undefined)){
        res.json(`Nome: ${nome}, Matricula: ${matricula}, Media: ${media}`)
    }else{
        res.status(404).json({message:"Dados inválidos"});
    }
});

/* Crie uma rota POST para “/alunos/deletar/:index” que indica qual aluno remover do array de dados (index). Trate a chamada se o aluno não existir (404); */

app.post("/alunos/deletar/:index", (req, res) => {
    const index = Number(req.params.index);
    

    if(index > 0 && index < alunos.length ){
        alunos.slice(index, 1);
        res.json({message: "Aluno removido!"})
    }else{
        res.status(404).json({message:"Aluno não encontrado"})
    }
});


/* Crie uma rota POST para /alunos/atualizar/:index, que no corpo da requisição recebe um objeto (nome, média) e atualiza os dados do aluno naquela posição. Trate a chamada se o aluno não existir (404); */

app.post("/alunos/atualizar/:index", (req,res) => {
    const {nome, media} = req.body
    const index = req.params.index

    if( index >= 0 && index < alunos.length){
    alunos[index].nome = nome;
    alunos[index].media = media;
    res.json({message:"Aluno atualizado com sucesso"})
    }else{
        res.status(404).json({message: "Aluno não encontrado!"})
    }
});












app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
  });
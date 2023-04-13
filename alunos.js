const fs = require('fs');
const alunos = [
  { nome: "José Almir", media: 9 },
  { nome: "Gabriel Braga", media: 9 },
  { nome: "Renata Rabelo", media: 6 },
  { nome: "Carlos Lima", media: 8 },
  { nome: "João Alves", media: 7 },
  { nome: "Camila Dias", media: 10 },
  { nome: "Marina Almeida", media: 6 },
  { nome: "Carolina Souza", media: 10 },
  { nome: "Thiago Tavares", media: 5 },
  { nome: "Claudia Fonseca", media: 3 },
];

//função feita com filter, onde recebe essa estrutura abaixo
//o includes determina se o array tem ou não o elemento passado, retornando true or false.
// O toLowerCase não fará distinção entre maísculas e minúsculas, ou seja, independente da forma que for digitado, ele irá retornar o nome solicitado.
function filtrarNomeAluno(nome) {
  alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(nome.toLowerCase())
  );
}

function filtrarMediaAluno(media){
    return alunos.filter(aluno => aluno.media >= media)
}

module.exports = alunos, filtrarNomeAluno, filtrarMediaAluno;



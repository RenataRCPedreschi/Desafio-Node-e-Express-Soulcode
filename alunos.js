const fs = require("fs");

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


function filtrarMediaAluno(media) {
  return alunos.filter((aluno) => aluno.media >= media);
}


/* Desafios 0 e 1 aqui */

function atualizarAluno(req, res) {
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
  fs.writeFile("./db.json", JSON.stringify(alunos));
}


function adicionarAluno(req, res) {
  const { nome, matricula, media } = req.body;
  if (nome !== undefined && matricula !== undefined && media !== undefined) {
    res.json(`Adicionado com sucesso! \n Nome: ${nome}, Matricula: ${matricula}, Media: ${media}`);
  } else {
    res.status(404).json({ message: "Dados inválidos" });
  }
  fs.writeFile("./db.json", JSON.stringify(alunos));
}

function deletarAluno(req, res) {
  const index = Number(req.params.index);

  if (index > 0 && index < alunos.length) {
    alunos.slice(index, 1);
    res.json({ message: "Aluno removido!" });
  } else {
    res.status(404).json({ message: "Aluno não encontrado" });
  }
  fs.writeFile("./db.json", JSON.stringify(alunos));
}

module.exports = {
  alunos,
  filtrarNomeAluno,
  filtrarMediaAluno,
  atualizarAluno,
  adicionarAluno,
  deletarAluno,
};

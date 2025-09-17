let listaQuestoes = [];

function salvarQuestao() {
    //  pega o valor da pergunta
    const pergunta = document.getElementById("pergunta").value;

    // pega todos os inputs de resposta
    const respostasInputs = document.querySelectorAll("#respostas input");
    let respostas = [];
    respostasInputs.forEach(input => {
        respostas.push(input.value);
    });

// cria um objeto com a pergunta e respostas
let questao = {
    pergunta: pergunta,
    respostas: respostas
};

//salva no array
listaQuestoes.push(questao);

// limpa os campos para adicionar uma nova questao
document.getElementById("pergunta").value = "";
respostasInputs.forEach((input, index) => {
    input.value = "";
    input.placeholder = `Resposta ${index+1}`;

});

alert("Questão salva!");
}

function adicionarResposta() {
  const divRespostas = document.getElementById("respostas");
  const quantidade = divRespostas.querySelectorAll("input").length + 1;

  // cria um novo input de resposta
  const novoInput = document.createElement("input");
  novoInput.type = "text";
  novoInput.placeholder = "Resposta " + quantidade;

  // adiciona o input na div
  divRespostas.appendChild(novoInput);
}

// Função para trocar de página
function IrPara(idPagina) {
  document.querySelectorAll(".pagina").forEach(p => p.classList.remove("ativa"));
  document.getElementById(idPagina).classList.add("ativa");
}

// Função para adicionar um campo de resposta
function adicionarResposta() {
  const divRespostas = document.getElementById("respostas");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Nova resposta";
  divRespostas.appendChild(input);
}

// Armazenar todas as questões do quiz
let questões = [];

// Função para salvar a questão atual
function salvarQuestao() {
    const pergunta = document.getElementById("pergunta").value;
    const respostasInputs = document.querySelectorAll("#respostas input");

    // Pra pegar todas as respostas digitadas
    const respostas = [];
    respostasInputs.forEach(input => {
        if (input.value.trim() !== "") {
            respostas.push(input.value);
        }
    });

// Criar objeto da questão
const questao = {
    pergunta: pergunta,
    respostas: respostas
};

// Guardar no array
questoes.push(questao);

// Limpar campos para proxima questão
document.getElementById("pergunta").value = "",
document.getElementById("respostas").innerHTML = `<input type="text" placeholder="resposta 1">
    <input type="text" placeholder="Resposta 1">
    <input type="text" placeholder="Resposta 2">
`;

// Ir para página de revisão
mostrarQuestoes();
IrParar("pagina-revisao");
}

// Mostrar lista das questões salvas
function mostrarQuestoes() {
    const lista = document.getElementById("lista-questoes");
    lista.innerHTML = "";

    questoes.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("questao-item");
        div.innerHTML = `
            <strong>${index + 1}. ${q.pergunta}</strong>
            <ul>
                ${q.respostas.map(r => `<li>${r}</li>`).join("")}
            </ul>
    `;
    });
}
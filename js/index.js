// Função para trocar de página
function irPara(idPagina) {
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

{
    pergunta: "Qual a capital do Brasil?",
    respostas
}

// Função para salvar a questão atual
function salvarQuestao() {
    const pergunta = document.getElementsById("pergunta").value;
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
irPara("pagina-revisao");
}

// Mostrar lista das questões salvas
function mostrarQuestoes() {
    const lista = document.getElementById("lista-questoes");
    lista.innerHTML = "";

    questoes.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("questao-item");
        div.innerHTML = `
            <strong>${index + 1}. ${q.pergunta}</strong><br>
            <em>${q.respostas.join(", ")}</em>
        `;
        lista.appendChild(div);
    });
}
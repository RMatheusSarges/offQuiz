// Armazenar todas as questões do quiz
let questoes = [];

function salvarQuestao() {
    // pega o valor da pergunta
    const pergunta = document.getElementById("pergunta").value;

    // pega todos os inputs de resposta
    const respostasInputs = document.querySelectorAll("#respostas input");
    let respostas = [];
    respostasInputs.forEach(input => {
        if (input.value.trim() !== "") {
            respostas.push(input.value);
        }
    });

    // cria um objeto com a pergunta e respostas
    let questao = {
        pergunta: pergunta,
        respostas: respostas
    };

    // salva no array
    questoes.push(questao);

    // limpa os campos para adicionar uma nova questao
    document.getElementById("pergunta").value = "";

    // recria os inputs de respostas dentro da div
    const divRespostas = document.getElementById("respostas");
    divRespostas.innerHTML = `
        <input type="text" placeholder="Resposta 1">
        <input type="text" placeholder="Resposta 2">
    `;

    // Ir para página de revisão
    mostrarQuestoes();
    IrPara("pagina-revisao");
}

// Função para adicionar mais respostas
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
        lista.appendChild(div);
    });
}

// controlar em qual questão o jogador está
let indiceAtual = 0;

function jogarQuiz() {
    indiceAtual = 0;
    mostrarQuestaoAtual();
    IrPara("pagina-jogar");
}

function mostrarQuestaoAtual() {
    const container = document.getElementById("quiz-pronto")
    container.innerHTML = "";

    if (indiceAtual >= questoes.length) {
        container.innerHTML = "<h3>Quiz finalizado!</h3>";
        return;
    }

    const questao = questoes[indiceAtual];

    // mostra a pergunta
    const perguntaEl = document.createElement("h3");
    perguntaEl.textContent = questao.pergunta;
    container.appendChild(perguntaEl);

    // mostra as respostas como radios
    questao.respostas.forEach((resp, i) => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="resposta" value="${i}">
            ${resp}
        `;
        container.appendChild(label);
        container.appendChild(document.createElement("br"));
     });
    
    // botão próxima
    const botaoProx = document.createElement("button");
    botaoProx.textContent = indiceAtual === questoes.length - 1 ? "Finalizar" : "Próxima";
    botaoProx.onclick = () => {
        indiceAtual++;
        mostrarQuestaoAtual();
    };
    container.appendChild(botaoProx);
}
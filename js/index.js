// Armazenar todas as questões do quiz
let questoes = [];
let indiceAtual = 0;

// Função para salvar a questão atual
function salvarQuestao() {
    const pergunta = document.getElementById("pergunta").value;
    const respostasInputs = document.querySelectorAll("#respostas input");
    let respostas = [];

    respostasInputs.forEach(input => {
        if (input.value.trim() !== "") {
            respostas.push(input.value);
        }
    });

    if (pergunta.trim() === "" || respostas.length < 2) {
        alert("Digite uma pergunta e pelo menos duas respostas!");
        return;
    }

    let questao = { pergunta, respostas };
    questoes.push(questao);

    document.getElementById("pergunta").value = "";
    document.getElementById("respostas").innerHTML = `
        <input type="text" placeholder="Resposta 1">
        <input type="text" placeholder="Resposta 2">
    `;

    mostrarQuestoes();
    IrPara("pagina-revisao");
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

// Adicionar resposta extra
function adicionarResposta() {
    const divRespostas = document.getElementById("respostas");
    const quantidade = divRespostas.querySelectorAll("input").length + 1;
    const novoInput = document.createElement("input");
    novoInput.type = "text";
    novoInput.placeholder = "Resposta " + quantidade;
    divRespostas.appendChild(novoInput);
}

// Trocar de página
function IrPara(idPagina) {
    document.querySelectorAll(".pagina").forEach(p => p.classList.remove("ativa"));
    document.getElementById(idPagina).classList.add("ativa");
}

// Jogar Quiz
function jogarQuiz() {
    indiceAtual = 0;
    mostrarQuestaoAtual();
    IrPara("pagina-jogar");
}

function mostrarQuestaoAtual() {
    const container = document.getElementById("quiz-pronto");
    container.innerHTML = "";

    if (indiceAtual >= questoes.length) {
        container.innerHTML = "<h3>Quiz finalizado!</h3>";
        return;
    }

    const questao = questoes[indiceAtual];

    const perguntaEl = document.createElement("h3");
    perguntaEl.textContent = questao.pergunta;
    container.appendChild(perguntaEl);

    questao.respostas.forEach((resp, i) => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="resposta" value="${i}">
            ${resp}
        `;
        container.appendChild(label);
        container.appendChild(document.createElement("br"));
    });

    const botaoProx = document.createElement("button");
    botaoProx.textContent = indiceAtual === questoes.length - 1 ? "Finalizar" : "Próxima";
    botaoProx.onclick = () => {
        indiceAtual++;
        mostrarQuestaoAtual();
    };
    container.appendChild(botaoProx);
}
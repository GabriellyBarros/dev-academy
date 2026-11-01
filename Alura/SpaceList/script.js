/**
 * ==============================================================================
 * SpaceList - Centro de Controle de Missões Espaciais (JavaScript)
 * Desafio 3: Identidade, Estatísticas, Automação de Datas, Temas e Tour Interativo
 * ==============================================================================
 */

// ==============================================================================
// 1. SELEÇÃO DE ELEMENTOS DO DOM (Document Object Model)
// ==============================================================================
const htmlElement = document.documentElement;
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const errorMessage = document.getElementById("error-message");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const filterButtons = document.querySelectorAll(".filter-btn");

// Elementos do Painel de Estatísticas
const statTotal = document.getElementById("stat-total");
const statPending = document.getElementById("stat-pending");
const statInProgress = document.getElementById("stat-in-progress");
const statCompleted = document.getElementById("stat-completed");
const progressPercentage = document.getElementById("progress-percentage");
const progressBarFill = document.getElementById("progress-bar-fill");

// Elementos do Mascote Astronauta
const mascotCard = document.getElementById("mascot-card");
const mascotStatusBadge = document.getElementById("mascot-status-badge");
const mascotDialogue = document.getElementById("mascot-dialogue");

// Elementos de Controle de Tema e Tour
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");
const restartTourBtn = document.getElementById("restart-tour-btn");
const starsContainer = document.getElementById("stars-container");

// Elementos do Modal de Tour do Astronauta
const tourBackdrop = document.getElementById("tour-backdrop");
const tourBox = document.getElementById("tour-box");
const tourTitle = document.getElementById("tour-title");
const tourStepCounter = document.getElementById("tour-step-counter");
const tourText = document.getElementById("tour-text");
const tourPrevBtn = document.getElementById("tour-prev-btn");
const tourNextBtn = document.getElementById("tour-next-btn");
const tourSkipBtn = document.getElementById("tour-skip-btn");

// ==============================================================================
// 2. ESTADO DA APLICAÇÃO (State)
// ==============================================================================
let tasks = carregarTarefasDoLocalStorage();
let currentFilter = "all";
let currentTourStep = 0;

// Configuração dos Passos do Tour Interativo
const tourSteps = [
  {
    targetId: "tour-header",
    title: "🚀 Bem-vindo à SpaceList!",
    text: "Olá, tripulante! Eu sou o Major Astro. Este é o seu Centro de Controle de Missões para organizar atividades com máxima precisão espacial."
  },
  {
    targetId: "theme-toggle-btn",
    title: "🌓 Alternância de Ambientes",
    text: "Alterne instantaneamente entre a 'Base de Lançamento' (tema claro tecnológico) e o 'Espaço Profundo' (tema escuro com nebulosas e estrelas)."
  },
  {
    targetId: "tour-stats",
    title: "📊 Painel de Telemetria e Progresso",
    text: "Acompanhe aqui o total de missões, contagem em tempo real de cada status e a porcentagem exata de conclusão com barra de progresso com foguete."
  },
  {
    targetId: "tour-mascot",
    title: "👨‍🚀 Mascote Reativo da Tripulação",
    text: "Eu reajo ao seu progresso! Se a frota estiver sem tarefas, ativo o modo 'Pesquisa com Mapa Estelar'. Quando atingir 100% de conclusão, acionarei meu jetpack para comemorar!"
  },
  {
    targetId: "task-form",
    title: "🎯 Lançamento de Novos Objetivos",
    text: "Digite sua meta e clique em 'Iniciar Nova Missão 🚀'. O sistema registrará automaticamente a data e hora em que a missão foi criada."
  },
  {
    targetId: "tour-filters",
    title: "🧭 Filtros e Gerenciamento de Status",
    text: "Cada missão pode estar Pendente, Em Andamento (com registro automático de início) ou Concluída (com registro automático de término). Pronto para decolar?"
  }
];

// ==============================================================================
// 3. UTILITÁRIOS: FORMATAÇÃO DE DATAS E ESTRELAS
// ==============================================================================

/**
 * Converte data ISO para padrão brasileiro: "31/10/2026 às 23:50"
 */
function formatarDataHora(dataIsoString) {
  if (!dataIsoString) return "";
  const data = new Date(dataIsoString);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}

/**
 * Gera partículas de estrelas cintilantes no fundo do Espaço Profundo
 */
function gerarEstrelasEspaciais() {
  if (!starsContainer) return;
  starsContainer.innerHTML = "";
  const quantidade = 70;

  for (let i = 0; i < quantidade; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2.5 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 3;

    star.style.position = "absolute";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.borderRadius = "50%";
    star.style.backgroundColor = i % 5 === 0 ? "#818cf8" : i % 7 === 0 ? "#38bdf8" : "#ffffff";
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    star.style.opacity = Math.random() * 0.7 + 0.3;
    star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`;
    star.style.animation = `twinkleStar ${duration}s infinite ease-in-out ${delay}s`;

    starsContainer.appendChild(star);
  }
}

// Injeção de keyframe dinâmico para estrelas
const styleTwinkle = document.createElement("style");
styleTwinkle.textContent = `
  @keyframes twinkleStar {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.3); }
  }
`;
document.head.appendChild(styleTwinkle);

// ==============================================================================
// 4. GESTÃO DE ESTADOS E AUTOMAÇÃO DE DATAS
// ==============================================================================

/**
 * Adiciona uma nova missão à SpaceList
 */
function adicionarTarefa(texto) {
  const textoLimpo = texto.trim();

  if (textoLimpo === "") {
    mostrarErro("Por favor, informe um objetivo para a nova missão.");
    return;
  }

  const novaTarefa = {
    id: Date.now(),
    text: textoLimpo,
    status: "pending",                       // Inicia como Pendente
    createdAt: new Date().toISOString(),     // Data/hora de criação automática
    startedAt: null,                         // Início automático ao ir para 'in_progress'
    completedAt: null                        // Término automático ao ir para 'completed'
  };

  tasks.unshift(novaTarefa);
  salvarNoLocalStorage();
  renderizarTudo();

  taskInput.value = "";
  taskInput.focus();
  limparErro();
}

/**
 * Atualiza o status da tarefa e registra/gerencia automaticamente as datas de Início e Término
 * @param {number} id - Identificador único
 * @param {string} novoStatus - 'pending' | 'in_progress' | 'completed'
 */
function atualizarStatusTarefa(id, novoStatus) {
  const agora = new Date().toISOString();

  tasks = tasks.map((tarefa) => {
    if (tarefa.id === id) {
      const atualizada = { ...tarefa, status: novoStatus };

      if (novoStatus === "in_progress") {
        // Registra automaticamente a data/hora de início se ainda não tiver
        if (!atualizada.startedAt) {
          atualizada.startedAt = agora;
        }
        // Ao voltar para em andamento, anula a data de conclusão
        atualizada.completedAt = null;
      } else if (novoStatus === "completed") {
        // Se foi direto para concluída, garante data de início
        if (!atualizada.startedAt) {
          atualizada.startedAt = atualizada.createdAt || agora;
        }
        // Registra automaticamente a data/hora exata de término
        atualizada.completedAt = agora;
      } else if (novoStatus === "pending") {
        // Volta para pendente: remove a data de término
        atualizada.completedAt = null;
      }

      return atualizada;
    }
    return tarefa;
  });

  salvarNoLocalStorage();
  renderizarTudo();
}

/**
 * Alternância rápida de conclusão pelo clique no checkbox
 */
function alternarRapidoConclusao(id) {
  const tarefa = tasks.find((t) => t.id === id);
  if (!tarefa) return;

  const novoStatus = tarefa.status === "completed" ? "pending" : "completed";
  atualizarStatusTarefa(id, novoStatus);
}

/**
 * Remove uma missão da frota
 */
function removerTarefa(id) {
  tasks = tasks.filter((tarefa) => tarefa.id !== id);
  salvarNoLocalStorage();
  renderizarTudo();
}

/**
 * Limpa todas as missões concluídas
 */
function limparTarefasConcluidas() {
  const concluidas = tasks.filter((t) => t.status === "completed").length;

  if (concluidas === 0) {
    mostrarErro("Não há missões concluídas para remover.");
    setTimeout(limparErro, 2500);
    return;
  }

  tasks = tasks.filter((tarefa) => tarefa.status !== "completed");
  salvarNoLocalStorage();
  renderizarTudo();
}

// ==============================================================================
// 5. ATUALIZAÇÃO DO PAINEL DE ESTATÍSTICAS E REAÇÃO DO MASCOTE
// ==============================================================================

/**
 * Calcula estatísticas em tempo real e atualiza a barra de progresso
 */
function atualizarEstatisticas() {
  const total = tasks.length;
  const pendentes = tasks.filter((t) => t.status === "pending").length;
  const emAndamento = tasks.filter((t) => t.status === "in_progress").length;
  const concluidas = tasks.filter((t) => t.status === "completed").length;

  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  // Atualiza números nos cards
  statTotal.textContent = total;
  statPending.textContent = pendentes;
  statInProgress.textContent = emAndamento;
  statCompleted.textContent = concluidas;

  // Atualiza a barra de progresso dinâmica
  progressPercentage.textContent = `${porcentagem}%`;
  progressBarFill.style.width = `${porcentagem}%`;
  progressBarFill.parentElement.setAttribute("aria-valuenow", porcentagem);

  // Atualiza o comportamento e fala do Mascote Astronauta
  atualizarMascote(total, pendentes, emAndamento, concluidas, porcentagem);
}

/**
 * Reações dinâmicas do Astronauta Mascote conforme o estado da lista
 */
function atualizarMascote(total, pendentes, emAndamento, concluidas, porcentagem) {
  if (total === 0) {
    // 1. Lista Vazia: Modo de Pesquisa e Mapa Estelar
    mascotCard.classList.remove("celebration");
    mascotStatusBadge.textContent = "🗺️ Modo Pesquisa: Análise de Cartas Estelares";
    mascotDialogue.textContent = "Nenhuma missão em curso neste quadrante. Inicie uma nova missão no comando abaixo para traçarmos nossos objetivos!";
  } else if (porcentagem === 100) {
    // 2. 100% de Conclusão: Comemoração com Jetpack Ativo
    mascotCard.classList.add("celebration");
    mascotStatusBadge.textContent = "🚀 PROPULSORES NO MÁXIMO! COMEMORAÇÃO DA TRIPULAÇÃO";
    mascotDialogue.textContent = "🎉 Missão 100% cumprida com louvor, comandante! Todos os motores estão calibrados e a frota atingiu o objetivo estelar com perfeição!";
  } else if (emAndamento > 0) {
    // 3. Missões em Andamento
    mascotCard.classList.remove("celebration");
    mascotStatusBadge.textContent = `☄️ Oficial de Voo: ${emAndamento} Missão(ões) em Órbita`;
    mascotDialogue.textContent = `Excelente ritmo! Temos ${emAndamento} missão(ões) em trânsito e ${pendentes} aguardando. Mantenha o foco nos controles!`;
  } else {
    // 4. Apenas missões pendentes
    mascotCard.classList.remove("celebration");
    mascotStatusBadge.textContent = "🛰️ Oficial de Voo: Major Astro";
    mascotDialogue.textContent = `Temos ${pendentes} objetivo(s) aguardando inicialização. Altere o status para 'Em Andamento' quando iniciar a execução!`;
  }
}

// ==============================================================================
// 6. RENDERIZAÇÃO DA LISTA DE MISSÕES
// ==============================================================================

/**
 * Renderiza visualmente todos os itens da lista
 */
function renderizarLista() {
  taskList.innerHTML = "";

  const filtradas = tasks.filter((tarefa) => {
    if (currentFilter === "pending") return tarefa.status === "pending";
    if (currentFilter === "in_progress") return tarefa.status === "in_progress";
    if (currentFilter === "completed") return tarefa.status === "completed";
    return true; // 'all'
  });

  // Visibilidade do Estado Vazio
  if (filtradas.length === 0) {
    emptyState.classList.add("visible");
  } else {
    emptyState.classList.remove("visible");
  }

  // Constrói cada card de missão
  filtradas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = `task-item status-${tarefa.status}`;

    // Lado Esquerdo: Checkbox + Conteúdo
    const taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    const customCheckbox = document.createElement("span");
    customCheckbox.className = "custom-checkbox";
    customCheckbox.title = "Clique para alternar conclusão rápida";
    customCheckbox.addEventListener("click", () => alternarRapidoConclusao(tarefa.id));

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = tarefa.text;

    // Metadados com Registro Automático de Datas
    const taskMeta = document.createElement("div");
    taskMeta.className = "task-meta";

    // 1. Data de Criação (sempre presente)
    const badgeCreated = document.createElement("span");
    badgeCreated.className = "meta-badge";
    badgeCreated.innerHTML = `📅 Criada: ${formatarDataHora(tarefa.createdAt)}`;
    taskMeta.appendChild(badgeCreated);

    // 2. Data de Início Automática (registrada ao mudar para 'in_progress')
    if (tarefa.startedAt) {
      const badgeStart = document.createElement("span");
      badgeStart.className = "meta-badge start-badge";
      badgeStart.innerHTML = `🚀 Início: ${formatarDataHora(tarefa.startedAt)}`;
      taskMeta.appendChild(badgeStart);
    }

    // 3. Data de Término Automática (registrada ao marcar como 'completed')
    if (tarefa.status === "completed" && tarefa.completedAt) {
      const badgeFinish = document.createElement("span");
      badgeFinish.className = "meta-badge finish-badge";
      badgeFinish.innerHTML = `🏁 Término: ${formatarDataHora(tarefa.completedAt)}`;
      taskMeta.appendChild(badgeFinish);
    }

    taskContent.appendChild(taskText);
    taskContent.appendChild(taskMeta);

    taskLeft.appendChild(customCheckbox);
    taskLeft.appendChild(taskContent);

    // Lado Direito: Seletor de Estados + Excluir
    const taskRight = document.createElement("div");
    taskRight.className = "task-right";

    const statusSelect = document.createElement("select");
    statusSelect.className = `status-select select-${tarefa.status}`;
    statusSelect.setAttribute("aria-label", "Alterar status da missão");

    const opcoes = [
      { valor: "pending", label: "⏳ Pendente" },
      { valor: "in_progress", label: "☄️ Em Andamento" },
      { valor: "completed", label: "🚩 Concluída" }
    ];

    opcoes.forEach((op) => {
      const opt = document.createElement("option");
      opt.value = op.valor;
      opt.textContent = op.label;
      if (tarefa.status === op.valor) opt.selected = true;
      statusSelect.appendChild(opt);
    });

    statusSelect.addEventListener("change", (e) => {
      atualizarStatusTarefa(tarefa.id, e.target.value);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.setAttribute("aria-label", "Remover missão");
    deleteBtn.title = "Remover missão";
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    `;
    deleteBtn.addEventListener("click", () => removerTarefa(tarefa.id));

    taskRight.appendChild(statusSelect);
    taskRight.appendChild(deleteBtn);

    li.appendChild(taskLeft);
    li.appendChild(taskRight);
    taskList.appendChild(li);
  });
}

/**
 * Função agregadora que renderiza lista e recalcula estatísticas
 */
function renderizarTudo() {
  renderizarLista();
  atualizarEstatisticas();
}

/**
 * Exibição e limpeza de erros
 */
function mostrarErro(msg) { errorMessage.textContent = msg; }
function limparErro() { errorMessage.textContent = ""; }

// ==============================================================================
// 7. GESTÃO DE TEMAS: ESPAÇO PROFUNDO E BASE DE LANÇAMENTO
// ==============================================================================

function inicializarTema() {
  const temaSalvo = localStorage.getItem("space_list_theme") || "dark";
  aplicarTema(temaSalvo);
}

function aplicarTema(tema) {
  htmlElement.setAttribute("data-theme", tema);
  localStorage.setItem("space_list_theme", tema);

  if (tema === "dark") {
    themeIcon.textContent = "🌙";
    themeText.textContent = "Espaço Profundo";
  } else {
    themeIcon.textContent = "☀️";
    themeText.textContent = "Base de Lançamento";
  }
}

function alternarTema() {
  const temaAtual = htmlElement.getAttribute("data-theme");
  const novoTema = temaAtual === "dark" ? "light" : "dark";
  aplicarTema(novoTema);
}

themeToggleBtn.addEventListener("click", alternarTema);

// ==============================================================================
// 8. TUTORIAL INTERATIVO (TOUR DO ASTRONAUTA MASCOTE)
// ==============================================================================

function iniciarTour(passo = 0) {
  currentTourStep = passo;
  tourBackdrop.classList.add("active");
  tourBox.classList.add("active");
  exibirPassoDoTour(currentTourStep);
}

function fecharTour() {
  tourBackdrop.classList.remove("active");
  tourBox.classList.remove("active");
  removerDestaquesTour();
  localStorage.setItem("space_list_tour_completed", "true");
}

function removerDestaquesTour() {
  document.querySelectorAll(".tour-spotlight").forEach((el) => {
    el.classList.remove("tour-spotlight");
  });
}

function exibirPassoDoTour(index) {
  removerDestaquesTour();

  const step = tourSteps[index];
  if (!step) return;

  const targetEl = document.getElementById(step.targetId);
  if (targetEl) {
    targetEl.classList.add("tour-spotlight");
    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  tourTitle.textContent = step.title;
  tourText.textContent = step.text;
  tourStepCounter.textContent = `Passo ${index + 1} de ${tourSteps.length}`;

  tourPrevBtn.disabled = index === 0;
  tourNextBtn.textContent = index === tourSteps.length - 1 ? "Concluir Missão 🚀" : "Continuar ➔";
}

tourNextBtn.addEventListener("click", () => {
  if (currentTourStep < tourSteps.length - 1) {
    currentTourStep++;
    exibirPassoDoTour(currentTourStep);
  } else {
    fecharTour();
  }
});

tourPrevBtn.addEventListener("click", () => {
  if (currentTourStep > 0) {
    currentTourStep--;
    exibirPassoDoTour(currentTourStep);
  }
});

tourSkipBtn.addEventListener("click", fecharTour);
restartTourBtn.addEventListener("click", () => iniciarTour(0));

// ==============================================================================
// 9. PERSISTÊNCIA E DADOS INICIAIS (LocalStorage)
// ==============================================================================

function salvarNoLocalStorage() {
  localStorage.setItem("space_list_tasks", JSON.stringify(tasks));
}

function carregarTarefasDoLocalStorage() {
  const dadosSalvos = localStorage.getItem("space_list_tasks");

  if (dadosSalvos) {
    try {
      const parsed = JSON.parse(dadosSalvos);
      return parsed.map((item) => {
        let status = item.status;
        if (!status) status = item.completed ? "completed" : "pending";

        return {
          id: item.id || Date.now(),
          text: item.text || "Missão Espacial",
          status: status,
          createdAt: item.createdAt || new Date().toISOString(),
          startedAt: item.startedAt || (status !== "pending" ? item.createdAt : null),
          completedAt: item.completedAt || (status === "completed" ? new Date().toISOString() : null)
        };
      });
    } catch (e) {
      console.error("Erro ao carregar dados do LocalStorage:", e);
      return [];
    }
  }

  // Amostra Didática Inicial do Desafio 3
  const agora = new Date();
  const umaHoraAtras = new Date(agora.getTime() - 60 * 60 * 1000).toISOString();
  const duasHorasAtras = new Date(agora.getTime() - 2 * 60 * 60 * 1000).toISOString();
  const tresHorasAtras = new Date(agora.getTime() - 3 * 60 * 60 * 1000).toISOString();

  return [
    {
      id: 1,
      text: "Calibrar instrumentos e trajes da tripulação",
      status: "completed",
      createdAt: tresHorasAtras,
      startedAt: duasHorasAtras,
      completedAt: umaHoraAtras
    },
    {
      id: 2,
      text: "Navegar pelo cinturão de asteroides da galáxia",
      status: "in_progress",
      createdAt: duasHorasAtras,
      startedAt: umaHoraAtras,
      completedAt: null
    },
    {
      id: 3,
      text: "Estabelecer base de comunicação em Marte",
      status: "pending",
      createdAt: agora.toISOString(),
      startedAt: null,
      completedAt: null
    }
  ];
}

// ==============================================================================
// 10. ESCUTADORES DE EVENTOS (Event Listeners)
// ==============================================================================

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  adicionarTarefa(taskInput.value);
});

taskInput.addEventListener("input", () => {
  if (errorMessage.textContent !== "") limparErro();
});

clearCompletedBtn.addEventListener("click", limparTarefasConcluidas);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderizarLista();
  });
});

// ==============================================================================
// 11. INICIALIZAÇÃO DA APLICAÇÃO
// ==============================================================================
inicializarTema();
gerarEstrelasEspaciais();
renderizarTudo();

// Se for o primeiro acesso, exibe o tour guiado com o Major Astro
if (localStorage.getItem("space_list_tour_completed") !== "true") {
  setTimeout(() => {
    iniciarTour(0);
  }, 400);
}

document.addEventListener("DOMContentLoaded", function () {
  // --- INICIALIZAÇÃO DAS BIBLIOTECAS ---

  AOS.init({
    duration: 800,
    once: true,
  });

  ScrollReveal().reveal(".col-md-6", {
    delay: 300,
    duration: 1000,
    origin: "bottom",
    distance: "100px",
    reset: true,
  });

  new TypeIt("#efeito-maquina-escrever", {
    speed: 50,
    loop: true,
    waitUntilVisible: true,
  })
    .type("domínio dos códigos.", { delay: 2000 })
    .delete(null, { delay: 500 })
    .type("desenvolvimento mobile.", { delay: 2000 })
    .delete(null, { delay: 500 })
    .type("futuro da tecnologia.", { delay: 2000 })
    .go();

  const carouselElement = document.querySelector("#carouselDepoimentos");
  if (carouselElement) {
    new bootstrap.Carousel(carouselElement, {
      interval: 5000,
      ride: "carousel",
    });
  }

  // --- LÓGICA DA SEÇÃO DE PERFORMANCE (ANTIGA, MANTIDA POR COMPATIBILIDADE) ---
  const perfButtons = document.querySelectorAll(".performance-button");
  const perfLines = document.querySelectorAll(".performance-line");
  const perfTexts = document.querySelectorAll(".performance-text");

  perfButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetLine = button.getAttribute("data-line");
      const targetText = button.getAttribute("data-text");

      perfLines.forEach((line) => line.classList.remove("active"));
      perfTexts.forEach((text) => text.classList.remove("active"));

      const lineEl = document.querySelector(`.performance-line[data-line="${targetLine}"]`);
      const textEl = document.querySelector(`.performance-text[data-text="${targetText}"]`);

      if (lineEl) lineEl.classList.add("active");
      if (textEl) textEl.classList.add("active");
    });
  });

  // --- CONTADOR DE ALUNOS ANIMADO ---
  const contador = document.getElementById("contadorAlunos");
  if (contador) {
    const final = 1000;
    const duration = 2000; // duração da animação em milissegundos
    let animacaoRodando = false;

    function animarContador() {
      const inicio = performance.now();
      animacaoRodando = true;

      function passo(agora) {
        const progresso = Math.min((agora - inicio) / duration, 1);
        const valor = Math.floor(progresso * final);
        contador.innerHTML = `${valor}+<br><small>de alunos</small>`;

        if (progresso < 1) {
          requestAnimationFrame(passo);
        } else {
          animacaoRodando = false;
        }
      }
      requestAnimationFrame(passo);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animacaoRodando) {
            animarContador();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(contador);
  }

  // --- LÓGICA DA GAVETA (SEÇÃO TI) ---
  const iconeGavetaSrc = "./images/simbolo TI.png";
  document.querySelectorAll(".iconeGaveta").forEach((img) => {
    img.src = iconeGavetaSrc;
  });

  const toggleBtn = document.querySelector(".toggleGaveta");
  const conteudo = document.querySelector(".conteudoGaveta");

  if (toggleBtn && conteudo) {
    toggleBtn.addEventListener("click", () => {
      conteudo.style.display = conteudo.style.display === "flex" ? "none" : "flex";
    });
  }
});

// --- EFEITOS QUE NÃO DEPENDEM DO DOM ESTAR CARREGADO ---

// Efeito de Parallax sutil no fundo com movimento do mouse
document.addEventListener("mousemove", (e) => {
  const background = document.querySelector(".background1");
  if (background) {
    const x = (e.clientX / window.innerWidth - 0.5) * 45;
    const y = (e.clientY / window.innerHeight - 0.8) * 13;
    background.style.backgroundPosition = `${70 + x}% ${10 + y}%`;
  }
});

// Botão "Voltar ao Topo"
window.addEventListener("scroll", () => {
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

// Função para criar a linha animada (trilha)
// Função para MOSTRAR a trilha e o texto
function mostrarTrilha(botao, texto) {
  const targetId = texto.id;
  // Se a trilha já existir, não faz nada para evitar duplicação
  if (document.querySelector(`.trilha[data-target='${targetId}']`)) return;

  const trilha = document.createElement("div");
  trilha.classList.add("trilha");
  trilha.setAttribute("data-target", targetId);

  const btnRect = botao.getBoundingClientRect();
  const textRect = texto.getBoundingClientRect();
  const scrollTop = window.scrollY;
  const scrollLeft = window.scrollX;

  const x1 = btnRect.left + btnRect.width / 2 + scrollLeft;
  const y1 = btnRect.top + btnRect.height / 2 + scrollTop;
  let x2;
  if (textRect.left > btnRect.left) {
    x2 = textRect.left + scrollLeft;
  } else {
    x2 = textRect.left + textRect.width + scrollLeft;
  }
  const y2 = textRect.top + textRect.height / 2 + scrollTop;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const distancia = Math.sqrt(dx * dx + dy * dy);
  const angulo = Math.atan2(dy, dx) * (180 / Math.PI);

  trilha.style.position = "absolute";
  trilha.style.top = `${y1}px`;
  trilha.style.left = `${x1}px`;
  trilha.style.transform = `rotate(${angulo}deg)`;
  trilha.style.transformOrigin = "left center";
  trilha.style.height = "0px";
  trilha.style.borderTop = "2px dashed whitesmoke";
  trilha.style.width = "0px";
  trilha.style.transition = "width 0.5s ease";
  document.body.appendChild(trilha);

  void trilha.offsetWidth; // Força o navegador a recalcular o layout

  trilha.style.width = `${distancia}px`;

  setTimeout(() => {
    texto.style.opacity = "1";
    texto.style.pointerEvents = "auto";
    texto.style.visibility = "visible";
  }, 500); // Mostra o texto depois que a linha terminar de se desenhar
}

// Função para ESCONDER a trilha e o texto
function esconderTrilha(texto) {
  const targetId = texto.id;
  const trilhaExistente = document.querySelector(`.trilha[data-target='${targetId}']`);

  if (trilhaExistente) {
    texto.style.opacity = "0";
    texto.style.pointerEvents = "none";
    texto.style.visibility = "hidden";

    trilhaExistente.style.width = "0px";
    setTimeout(() => {
      if (trilhaExistente) trilhaExistente.remove();
    }, 500); // Remove a trilha do HTML após a animação de encolher
  }
}

// Adiciona os novos eventos de mouse
document.querySelectorAll(".button11").forEach((btn) => {
  if (window.innerWidth > 768) {
    // A funcionalidade só funciona em telas maiores
    const targetId = btn.getAttribute("data-target");
    const texto = document.getElementById(targetId);

    if (texto) {
      btn.addEventListener("mouseenter", () => mostrarTrilha(btn, texto));
      btn.addEventListener("mouseleave", () => esconderTrilha(texto));
    }
  }
});

// --- EFEITOS GERAIS (MANTIDOS COMO ESTAVAM) ---
document.addEventListener("mousemove", (e) => {
  const background = document.querySelector(".background1");
  if (background) {
    const x = (e.clientX / window.innerWidth - 0.5) * 45;
    const y = (e.clientY / window.innerHeight - 0.8) * 13;
    background.style.backgroundPosition = `${70 + x}% ${10 + y}%`;
  }
});

window.addEventListener("scroll", () => {
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

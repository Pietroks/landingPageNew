AOS.init();

document.addEventListener("DOMContentLoaded", function () {
  new window.TypeIt("#typed", {
    strings: ["Inscreva-se agora", "Garanta seu futuro na tecnologia!"],
    speed: 100,
    loop: true,
  }).go();
});

document.addEventListener("mousemove", (e) => {
  const background = document.querySelector(".background1");
  const x = (e.clientX / window.innerWidth - 0.5) * 45;
  const y = (e.clientY / window.innerHeight - 0.8) * 13;
  background.style.backgroundPosition = `${70 + x}% ${10 + y}%`;
});

ScrollReveal().reveal(".col-md-6", {
  delay: 300,
  duration: 1000,
  origin: "bottom",
  distance: "100px",
  reset: true,
});

document.addEventListener("DOMContentLoaded", () => {
  const contador = document.getElementById("contadorAlunos");
  const final = 1000;
  const duration = 2000; // duração da animação em milissegundos
  let animacaoRodando = false;

  function animarContador() {
    const inicio = performance.now();

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

    animacaoRodando = true;
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
});

window.addEventListener("scroll", () => {
  document.getElementById("backToTop").style.display = window.scrollY > 300 ? "block" : "none";
});

function criarTrilhaComAnimacao(botao, texto) {
  const targetId = texto.id;
  const trilhaExistente = document.querySelector(`.trilha[data-target='${targetId}']`);

  const jaVisivel = texto.style.opacity === "1";

  if (jaVisivel && trilhaExistente) {
    // Oculta o texto
    texto.style.opacity = "0";
    texto.style.pointerEvents = "none";
    texto.style.visibility = "hidden";

    // Anima a trilha de volta
    trilhaExistente.style.transition = "width 0.5s ease";
    trilhaExistente.style.width = "0px";

    // Remove a trilha após a animação
    setTimeout(() => {
      trilhaExistente.remove();
    }, 500);

    return;
  }

  // Cria nova trilha
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

  // Força reflow
  void trilha.offsetWidth;

  // Estica a trilha até o texto
  trilha.style.width = `${distancia}px`;

  // Mostra o texto depois da linha
  setTimeout(() => {
    texto.style.opacity = "1";
    texto.style.pointerEvents = "auto";
    texto.style.visibility = "visible";
  }, 500);
}

document.querySelectorAll(".button11").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (window.innerWidth <= 768) return;

    const targetId = btn.getAttribute("data-target");
    const texto = document.getElementById(targetId);
    criarTrilhaComAnimacao(btn, texto);
  });
});

document.addEventListener("DOMContentLoaded", () => {
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

// Slide

let screenWidth = window.innerWidth;
const splideOptions = {
  autoplay: true,
  arrows: true,
  drag: false,
  pauseOnHover: false,
  pagination: false,

  interval: 10000,
  speed: 1100,
  //   updateOnMove: true,
  focus: "center",
  //   slideFocus: true,
  type: "loop",
  fixedWidth: "62.5%",
  gap: "28px",

  breakpoints: {
    1024: {
      fixedWidth: "80%",
      gap: "20px",
    },
    768: {
      drag: true,
    },
    480: {
      fixedWidth: "95%",
      gap: "20px",
      arrows: false,
    },
  },
};

new Splide(".splide", splideOptions).mount();

// Conteúdo da página
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://127.0.0.1:8000/index/1";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("text1").innerText = data.secao1_titulo1;
      document.getElementById("text2").innerText = data.secao1_titulo2;
      document.getElementById("text3").innerText = data.secao1_descricao;
      document.getElementById("text4").innerText = data.secao2_titulo;
      document.getElementById("text5").innerText = data.secao2_texto;
      document.getElementById("text6").innerText = data.secao3_titulo;
      document.getElementById("text7").innerText = data.leitor1_texto;
      document.getElementById("text8").innerText = data.leitor1_nome;
      document.getElementById("text9").innerText = data.leitor2_texto;
      document.getElementById("text10").innerText = data.leitor2_nome;
      document.getElementById("text11").innerText = data.leitor3_texto;
      document.getElementById("text12").innerText = data.leitor3_nome;
      document.getElementById("text13").innerText = data.leitor4_texto;
      document.getElementById("text14").innerText = data.leitor4_nome;
      document.getElementById("text15").innerText = data.leitor5_texto;
      document.getElementById("text16").innerText = data.leitor5_nome;
      document.getElementById("text17").innerText = data.secao4_titulo;
      document.getElementById("text18").innerText = data.secao4_texto;
      document.getElementById("text19").innerText = data.secao5_texto;
      document.getElementById("text20").innerText = data.secao5_botao;
    })
    .catch((error) => {
      console.error("Erro ao buscar dados da API:", error);
    });
});

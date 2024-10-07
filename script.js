// Slide

let screenWidth = window.innerWidth;
const splideOptions = {
  autoplay: false,
  arrows: true,
  drag: false,
  pauseOnHover: false,
  pagination: false,
  clones: "2",

  interval: 10000,
  speed: 1100,
  type: "loop",
  focus: "center",
  // slideFocus: true,
  // updateOnMove: true,
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
      // Textos
      document.getElementById("text1").innerText = data.secao1_titulo1;
      document.getElementById("text2").innerText = data.secao1_titulo2;
      document.getElementById("text3").innerText = data.secao1_descricao;
      document.getElementById("text4").innerText = data.secao2_titulo;
      document.getElementById("text5").innerText = data.secao2_texto;
      document.getElementById("text6").innerText = data.secao3_titulo;
      document.querySelector(".text7").innerText = data.leitor1_texto;
      document.querySelector(".text8").innerText = data.leitor1_nome;
      document.querySelector(".text9").innerText = data.leitor2_texto;
      document.querySelector(".text10").innerText = data.leitor2_nome;
      document.querySelector(".text11").innerText = data.leitor3_texto;
      document.querySelector(".text12").innerText = data.leitor3_nome;
      document.querySelector(".text13").innerText = data.leitor4_texto;
      document.querySelector(".text14").innerText = data.leitor4_nome;
      document.querySelector(".text15").innerText = data.leitor5_texto;
      document.querySelector(".text16").innerText = data.leitor5_nome;
      document.getElementById("text17").innerText = data.secao4_titulo;
      document.getElementById("text18").innerText = data.secao4_texto;
      document.getElementById("text19").innerText = data.secao5_texto;
      document.getElementById("text20").innerText = data.secao5_botao;

      // Imagens
      document.getElementById("img1").src = data.secao1_imagemAutor;
      document.getElementById("img2").src = data.leitor1_imagem;
      document.getElementById("img3").src = data.leitor2_imagem;
      document.getElementById("img4").src = data.leitor3_imagem;
      document.getElementById("img5").src = data.leitor4_imagem;
      document.getElementById("img6").src = data.leitor5_imagem;
      document.getElementById("img7").src = data.secao4_imagem2;
      document.getElementById("img8").src = data.secao4_imagem1;

      // Backgrounds
      document.getElementById(
        "historia"
      ).style.backgroundImage = `url(${data.secao2_imagemFundo})`;
      document.getElementById(
        "cta"
      ).style.backgroundImage = `url(${data.secao5_imagemFundo})`;

      // Pseudo-elemento
      const element = document.getElementById("inicio");
      element.classList.add("dynamic-background");

      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(
        `#inicio.dynamic-background::before { background-image: url(${data.secao1_imagemFundo}); }`,
        styleSheet.cssRules.length
      );

      // Clones do Splide
      document.querySelector("#splide01-slide04 .text13").innerText =
        data.leitor4_texto;
      document.querySelector("#splide01-slide04 .text14").innerText =
        data.leitor4_nome;
      document.querySelector("#splide01-slide04 img").src = data.leitor4_imagem;

      document.querySelector("#splide01-slide05 .text15").innerText =
        data.leitor5_texto;
      document.querySelector("#splide01-slide05 .text16").innerText =
        data.leitor5_nome;
      document.querySelector("#splide01-slide05 img").src = data.leitor5_imagem;

      document.querySelector("#splide01-clone03 .text7").innerText =
        data.leitor1_texto;
      document.querySelector("#splide01-clone03 .text8").innerText =
        data.leitor1_nome;
      document.querySelector("#splide01-clone03 img").src = data.leitor1_imagem;

      document.querySelector("#splide01-clone04 .text9").innerText =
        data.leitor2_texto;
      document.querySelector("#splide01-clone04 .text10").innerText =
        data.leitor2_nome;
      document.querySelector("#splide01-clone04 img").src = data.leitor2_imagem;
    })
    .catch((error) => {
      console.error("Erro ao buscar dados da API:", error);
    });
});

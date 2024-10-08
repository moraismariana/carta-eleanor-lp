document.addEventListener("DOMContentLoaded", async () => {
  // Verifica se o usuário está autenticado
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("Você precisa estar autenticado para editar.");
    window.location.href = "./login.html";
    return;
  }

  // Verifica se o token ainda é válido
  try {
    const verifyResponse = await fetch("http://127.0.0.1:8000/index/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!verifyResponse.ok) {
      // Token expirou ou é inválido, redirecionar para o login
      alert("Sessão expirada. Por favor, faça login novamente.");
      localStorage.removeItem("accessToken");
      window.location.href = "./login.html";
      return;
    }

    console.log("Acesso permitido!");
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    window.location.href = "./login.html";
    return;
  }

  const apiUrl = "http://127.0.0.1:8000/index/1/";

  // Preenche o formulário com os dados atuais da API
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar dados da API.");
    }

    const data = await response.json();
    document.getElementById("input1").value = data.secao1_titulo1;
    document.getElementById("input2").value = data.secao1_titulo2;
    document.getElementById("input3").value = data.secao1_descricao;
    document.getElementById("input4").value = data.secao2_titulo;
    document.getElementById("input5").value = data.secao2_texto;
    document.getElementById("input6").value = data.secao3_titulo;
    document.getElementById("input7").value = data.leitor1_texto;
    document.getElementById("input8").value = data.leitor1_nome;
    document.getElementById("input9").value = data.leitor2_texto;
    document.getElementById("input10").value = data.leitor2_nome;
    document.getElementById("input11").value = data.leitor3_texto;
    document.getElementById("input12").value = data.leitor3_nome;
    document.getElementById("input13").value = data.leitor4_texto;
    document.getElementById("input14").value = data.leitor4_nome;
    document.getElementById("input15").value = data.leitor5_texto;
    document.getElementById("input16").value = data.leitor5_nome;
    document.getElementById("input17").value = data.secao4_titulo;
    document.getElementById("input18").value = data.secao4_texto;
    document.getElementById("input19").value = data.secao5_texto;
    document.getElementById("input20").value = data.secao5_botao;

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

    // Pseudo elementos
    const element = document.getElementById("inicio");
    element.classList.add("dynamic-background");

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `#inicio.dynamic-background::before { background-image: url(${data.secao1_imagemFundo}); }`,
      styleSheet.cssRules.length
    );
  } catch (error) {
    console.error("Erro ao carregar dados para edição:", error);
    alert("Erro ao carregar dados.");
  }

  // Atualiza os dados na API
  document
    .getElementById("update-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      // Cria um FormData para os dados do formulário
      const formData = new FormData();

      // Adiciona os dados de texto ao FormData
      formData.append(
        "secao1_titulo1",
        document.getElementById("input1").value
      );
      formData.append(
        "secao1_titulo2",
        document.getElementById("input2").value
      );
      formData.append(
        "secao1_descricao",
        document.getElementById("input3").value
      );
      formData.append("secao2_titulo", document.getElementById("input4").value);
      formData.append("secao2_texto", document.getElementById("input5").value);
      formData.append("secao3_titulo", document.getElementById("input6").value);
      formData.append("leitor1_texto", document.getElementById("input7").value);
      formData.append("leitor1_nome", document.getElementById("input8").value);
      formData.append("leitor2_texto", document.getElementById("input9").value);
      formData.append("leitor2_nome", document.getElementById("input10").value);
      formData.append(
        "leitor3_texto",
        document.getElementById("input11").value
      );
      formData.append("leitor3_nome", document.getElementById("input12").value);
      formData.append(
        "leitor4_texto",
        document.getElementById("input13").value
      );
      formData.append("leitor4_nome", document.getElementById("input14").value);
      formData.append(
        "leitor5_texto",
        document.getElementById("input15").value
      );
      formData.append("leitor5_nome", document.getElementById("input16").value);
      formData.append(
        "secao4_titulo",
        document.getElementById("input17").value
      );
      formData.append("secao4_texto", document.getElementById("input18").value);
      formData.append("secao5_texto", document.getElementById("input19").value);
      formData.append("secao5_botao", document.getElementById("input20").value);

      // imagens
      const img1 = document.getElementById("img1-input").files[0];
      if (img1) {
        const imgDataUrl = document.getElementById("img1").dataset.imageData;

        if (imgDataUrl) {
          // Converter o Data URL (base64) em um Blob
          const response = await fetch(imgDataUrl);
          const blob = await response.blob();

          // Adicionar o Blob ao FormData
          formData.append("secao1_imagemAutor", blob, "imagem-autor.png");
        }
      }

      const img2 = document.getElementById("img2-input").files[0];
      if (img2) {
        const imgDataUrl = document.getElementById("img2").dataset.imageData;

        if (imgDataUrl) {
          // Converter o Data URL (base64) em um Blob
          const response = await fetch(imgDataUrl);
          const blob = await response.blob();

          // Adicionar o Blob ao FormData
          formData.append("leitor1_imagem", blob, "leitor-1.png");
        }
      }

      const img3 = document.getElementById("img3-input").files[0];
      if (img3) {
        const imgDataUrl = document.getElementById("img3").dataset.imageData;

        if (imgDataUrl) {
          // Converter o Data URL (base64) em um Blob
          const response = await fetch(imgDataUrl);
          const blob = await response.blob();

          // Adicionar o Blob ao FormData
          formData.append("leitor2_imagem", blob, "leitor-2.png");
        }
      }

      const img4 = document.getElementById("img4-input").files[0];
      if (img4) {
        const imgDataUrl = document.getElementById("img4").dataset.imageData;

        if (imgDataUrl) {
          // Converter o Data URL (base64) em um Blob
          const response = await fetch(imgDataUrl);
          const blob = await response.blob();

          // Adicionar o Blob ao FormData
          formData.append("leitor3_imagem", blob, "leitor-3.png");
        }
      }

      const img5 = document.getElementById("img5-input").files[0];
      if (img5) {
        const imgDataUrl = document.getElementById("img5").dataset.imageData;

        if (imgDataUrl) {
          // Converter o Data URL (base64) em um Blob
          const response = await fetch(imgDataUrl);
          const blob = await response.blob();

          // Adicionar o Blob ao FormData
          formData.append("leitor4_imagem", blob, "leitor-4.png");
        }
      }

      const img6 = document.getElementById("img6-input").files[0];
      if (img6) {
        const imgDataUrl = document.getElementById("img6").dataset.imageData;

        if (imgDataUrl) {
          // Converter o Data URL (base64) em um Blob
          const response = await fetch(imgDataUrl);
          const blob = await response.blob();

          // Adicionar o Blob ao FormData
          formData.append("leitor5_imagem", blob, "leitor-5.png");
        }
      }

      const img7 = document.getElementById("img7-input").files[0];
      if (img7) {
        const imgDataUrl = document.getElementById("img7").dataset.imageData;

        if (imgDataUrl) {
          // Converter o Data URL (base64) em um Blob
          const response = await fetch(imgDataUrl);
          const blob = await response.blob();

          // Adicionar o Blob ao FormData
          formData.append("secao4_imagem2", blob, "autor-1.png");
        }
      }

      const img8 = document.getElementById("img8-input").files[0];
      if (img8) {
        const imgDataUrl = document.getElementById("img8").dataset.imageData;

        if (imgDataUrl) {
          // Converter o Data URL (base64) em um Blob
          const response = await fetch(imgDataUrl);
          const blob = await response.blob();

          // Adicionar o Blob ao FormData
          formData.append("secao4_imagem1", blob, "autor-2.png");
        }
      }

      // backgrounds
      const bg1 = document.getElementById("bg1-input").files[0];
      if (bg1) {
        formData.append("secao1_imagemFundo", bg1);
      }
      const bg2 = document.getElementById("bg2-input").files[0];
      if (bg2) {
        formData.append("secao2_imagemFundo", bg2);
      }
      const bg3 = document.getElementById("bg3-input").files[0];
      if (bg3) {
        formData.append("secao5_imagemFundo", bg3);
      }

      try {
        // Faz a requisição PATCH com o FormData
        const updateResponse = await fetch(apiUrl, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token, // Cabeçalhos sem 'Content-Type', pois o FormData o define automaticamente
          },
          body: formData, // Usa o FormData para enviar os dados
        });

        if (!updateResponse.ok) {
          throw new Error("Erro ao atualizar a API.");
        }

        const data = await updateResponse.json();
        alert("Conteúdo atualizado com sucesso!");
        // Redirecionar para a página de edição
        window.location.href = "./";
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
        alert("Você não tem permissão para atualizar os dados.");
      }
    });
});

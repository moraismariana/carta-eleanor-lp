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
  } catch (error) {
    console.error("Erro ao carregar dados para edição:", error);
    alert("Erro ao carregar dados.");
  }

  // Atualiza os dados na API
  document
    .getElementById("update-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const updatedData = {
        secao1_titulo1: document.getElementById("input1").value,
        secao1_titulo2: document.getElementById("input2").value,
        secao1_descricao: document.getElementById("input3").value,
        secao2_titulo: document.getElementById("input4").value,
        secao2_texto: document.getElementById("input5").value,
        secao3_titulo: document.getElementById("input6").value,
        leitor1_texto: document.getElementById("input7").value,
        leitor1_nome: document.getElementById("input8").value,
        leitor2_texto: document.getElementById("input9").value,
        leitor2_nome: document.getElementById("input10").value,
        leitor3_texto: document.getElementById("input11").value,
        leitor3_nome: document.getElementById("input12").value,
        leitor4_texto: document.getElementById("input13").value,
        leitor4_nome: document.getElementById("input14").value,
        leitor5_texto: document.getElementById("input15").value,
        leitor5_nome: document.getElementById("input16").value,
        secao4_titulo: document.getElementById("input17").value,
        secao4_texto: document.getElementById("input18").value,
        secao5_texto: document.getElementById("input19").value,
        secao5_botao: document.getElementById("input20").value,
      };

      try {
        const updateResponse = await fetch(apiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(updatedData),
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

// const textareas = document.querySelectorAll("textarea");

// textareas.forEach((textarea) => {
//   textarea.addEventListener("input", function () {
//     this.style.height = "1em";
//     this.style.height = `${this.scrollHeight - 10}px`;
//   });
// });

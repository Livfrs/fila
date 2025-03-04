document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
      alert("Preencha todos os campos!");
      return;
    }

    alert("Login realizado com sucesso!\nE-mail: " + email);
  });

const API_URL = "http://localhost:5501";

// Hanterar Light och Dark mode
const toggleMode = () => {
  const body = document.body;
  const newTheme = body.dataset.bsTheme === "dark" ? "light" : "dark";
  body.dataset.bsTheme = newTheme;
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
};

const updateIcon = (theme) => {
  const themeIcon = document.getElementById("themeIcon");
  themeIcon.className =
    theme === "dark" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
};

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.dataset.bsTheme = savedTheme;
  document.getElementById("flexSwitchCheckChecked").checked =
    savedTheme === "dark";
  updateIcon(savedTheme);
});

// Login Form
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        document.getElementById("login-form-button").innerText = "Inloggad!";
        window.location.reload();
      } else {
        document.getElementById("error-msg").innerText = "Fel vid inloggning";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Växlar logga in-texten om användaren är inloggad eller inte
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");
  const loginText = loginButton.querySelector(".nav-link");

  if (localStorage.getItem("accessToken")) {
    loginText.innerHTML = 'Mina sidor <i class="bi bi-person-fill-gear"></i>';
    loginButton.onclick = () => (window.location.href = "/client/account.html");
  }
});

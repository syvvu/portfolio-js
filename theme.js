document.addEventListener("DOMContentLoaded", () => {
  const themeToggler = document.getElementById("theme-toggler");
  const themeIcon = document.getElementById("theme-icon");
  let currentTheme = localStorage.getItem("theme") || "light";

  themeToggler.style.display = "block";

  function updateIcon() {
    if (currentTheme === "light") {
      themeIcon.src = "./assets/palette.png";
      themeIcon.alt = "Switch to dark theme";
    } else {
      themeIcon.src = "./assets/palette-dark.png";
      themeIcon.alt = "Switch to light theme";
    }
  }

  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  updateIcon();

  themeToggler.addEventListener("click", () => {
    if (currentTheme === "light") {
      document.body.classList.add("dark-theme");
      currentTheme = "dark";
    } else {
      document.body.classList.remove("dark-theme");
      currentTheme = "light";
    }
    updateIcon();
    localStorage.setItem("theme", currentTheme);
  });
});

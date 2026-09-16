// Shared light/dark theme handling, matching gränslandet.se.
// Loaded from <head> so the theme is set before the first paint, which
// avoids a flash of the wrong background.

(function () {
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // Private mode or blocked storage — the theme still applies for this page.
    }
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  }

  // Initialise from a previous choice, falling back to the OS preference.
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (e) {
    // Ignore — fall through to the OS preference.
  }

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }

  // Add the toggle button once the body exists. Pages that opt out with
  // data-theme-toggle="off" still get the theme, just no button — the
  // project pages open with a full-bleed header image the button would
  // sit on top of.
  document.addEventListener("DOMContentLoaded", function () {
    if (document.body.dataset.themeToggle === "off") {
      return;
    }

    const btn = document.createElement("button");
    btn.id = "theme-toggle";
    btn.setAttribute("aria-label", "Växla mellan mörkt och ljust läge");
    btn.textContent = html.getAttribute("data-theme") === "dark" ? "🌙" : "☀️";
    btn.addEventListener("click", function () {
      setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
    document.body.appendChild(btn);
  });
})();

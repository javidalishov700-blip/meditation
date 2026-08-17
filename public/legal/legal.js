(function () {
  var langs = ["tr", "en", "az", "ru", "es", "it"];
  var labels = { tr: "Türkçe", en: "English", az: "Azərbaycan", ru: "Русский", es: "Español", it: "Italiano" };

  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && langs.indexOf(q) >= 0) return q;
    try {
      var saved = localStorage.getItem("steady-legal-lang");
      if (saved && langs.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (nav === "az") return "az";
    if (langs.indexOf(nav) >= 0) return nav;
    return "en";
  }

  function apply(lang) {
    if (langs.indexOf(lang) < 0) lang = "en";
    document.documentElement.lang = lang;
    document.querySelectorAll(".pack").forEach(function (el) {
      el.classList.toggle("is-on", el.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll("[data-lang-link]").forEach(function (el) {
      el.setAttribute("aria-current", el.getAttribute("data-lang-link") === lang ? "true" : "false");
    });
    try {
      localStorage.setItem("steady-legal-lang", lang);
    } catch (e) {}
    var titleEl = document.querySelector('.pack[data-lang="' + lang + '"] h1');
    if (titleEl) document.title = titleEl.textContent + " · Steady";
  }

  function bar() {
    var host = document.querySelector(".langs");
    if (!host) return;
    host.innerHTML = "";
    var page = location.pathname.split("/").pop() || "privacy.html";
    langs.forEach(function (code) {
      var a = document.createElement("a");
      a.href = page + "?lang=" + code;
      a.setAttribute("data-lang-link", code);
      a.textContent = labels[code];
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        history.replaceState({}, "", page + "?lang=" + code);
        apply(code);
      });
      host.appendChild(a);
    });
  }

  bar();
  apply(pick());
})();

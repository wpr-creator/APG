(() => {
  "use strict";
  const root = new URL("./", document.currentScript.src);
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
      const destination = new URL(a.href, location.href);
      if (destination.origin === root.origin && destination.pathname.startsWith(root.pathname)) a.removeAttribute("target");
    });
    document.addEventListener("click", event => {
      const a = event.target.closest?.("a[href]");
      if (!a) return;
      const destination = new URL(a.href, location.href);
      if (destination.origin === root.origin && destination.pathname.startsWith(root.pathname)) {
        a.removeAttribute("target");
        try {
          const saved = JSON.parse(sessionStorage.getItem("apg-return-lesson") || "null");
          if (saved?.destination === location.pathname && destination.pathname !== root.pathname && !destination.pathname.endsWith("/index.html")) {
            sessionStorage.setItem("apg-return-lesson", JSON.stringify({ ...saved, destination: destination.pathname }));
          }
        } catch (_) {}
      }
    }, true);
    const homeHeader = document.querySelector(".site-header");
    if (homeHeader) {
      homeHeader.classList.add("apg-shared-header");
      homeHeader.querySelector(".brand").classList.add("apg-shared-brand");
      return;
    }
    const existingBack = Array.from(document.querySelectorAll("a[href]")).find(a => /#gov-[0-5]/.test(a.href));
    const unitMatch = (existingBack?.href || location.pathname).match(/(?:#gov-|unit)([0-5])/);
    let unit = unitMatch ? "gov-" + unitMatch[1] : "";
    if (!unit && /prove-your-case|presidential-yearbook|civic-selfie/.test(location.pathname)) unit = "gov-0";
    if (!unit && /history-/.test(location.pathname)) unit = "gov-1";
    let lesson = "";
    try {
      const saved = JSON.parse(sessionStorage.getItem("apg-return-lesson") || "null");
      if (saved && saved.destination === location.pathname) { unit = saved.unit; lesson = saved.lesson; }
    } catch (_) {}
    document.querySelectorAll("body > header, body > nav, body > .course-header").forEach(el => {
      if (!el.matches("nav, .course-header, .course-shell, .page-header") && !el.querySelector(".header-brand, .header-inner")) return;
      el.classList.add("apg-replaced-navigation");
    });
    const header = document.createElement("header");
    header.className = "apg-shared-header";
    const brand = document.createElement("a");
    brand.className = "apg-shared-brand";
    brand.href = root.href + "#home";
    const mark = document.createElement("img");
    mark.src = new URL("assets/course-mark.svg", root).href; mark.alt = ""; mark.width = 44; mark.height = 44;
    const name = document.createElement("span");
    name.innerHTML = "<strong>AP UNITED STATES GOVERNMENT</strong><small>MR. ROGERS · O’FARRELL HIGH SCHOOL</small>";
    brand.append(mark, name);
    const button = document.createElement("button");
    button.type = "button"; button.textContent = "☰ Menu";
    button.setAttribute("aria-expanded", "false"); button.setAttribute("aria-controls", "apg-shared-nav");
    const nav = document.createElement("nav"); nav.id = "apg-shared-nav"; nav.setAttribute("aria-label", "Main navigation");
    [["Home","home"],["Units","units"],["Foundations","foundations"],["Glossary","words"],["Skill Builders","skills"]].forEach(([label, hash]) => {
      const a = document.createElement("a"); a.textContent = label; a.href = root.href + "#" + hash; nav.append(a);
    });
    button.addEventListener("click", () => { const open = button.getAttribute("aria-expanded") !== "true"; button.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open); });
    header.addEventListener("keydown", event => { if (event.key === "Escape") { nav.classList.remove("is-open"); button.setAttribute("aria-expanded", "false"); button.focus(); } });
    header.append(brand, button, nav); document.body.prepend(header);
    const skip = document.querySelector(".skip-link");
    if (skip) document.body.prepend(skip);
    {
      const back = document.createElement("a"); back.className = "apg-return-link";
      back.textContent = unit ? "← BACK TO UNIT " + unit.slice(-1) + (lesson ? " · YOUR LESSON" : "") : "← BACK TO UNITS";
      back.href = root.href + (lesson ? "?lesson=" + encodeURIComponent(lesson) : "") + "#" + (unit || "units");
      header.after(back);
    }
  });
})();

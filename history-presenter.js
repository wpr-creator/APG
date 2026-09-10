(() => {
  const order = ["independence", "articles", "crisis", "convention", "compromises", "debate", "rights"];
  const openingSlides = [
    { type: "title", label: "Title slide" },
    { type: "hook", label: "The hook" },
    { type: "bridge", label: "The bridge" }
  ];
  const sectionSlides = order.map(key => window.HISTORY_SECTION_DATA?.[key]).filter(Boolean).map(section => ({ type: "section", section }));
  const slides = [...openingSlides, ...sectionSlides];
  let index = Math.min(Math.max(Number(new URLSearchParams(location.search).get("slide")) - 1 || 0, 0), slides.length - 1);
  const number = document.getElementById("slide-number");
  const label = document.getElementById("slide-label");
  const title = document.getElementById("slide-title");
  const bigIdea = document.getElementById("slide-big-idea");
  const keyPoints = document.getElementById("slide-key-points");
  const current = document.getElementById("current-slide");
  const previous = document.getElementById("previous-button");
  const next = document.getElementById("next-button");
  const dots = document.getElementById("slide-dots");
  const fullscreen = document.getElementById("fullscreen-button");
  const sectionSlide = document.getElementById("section-slide");
  const openingPanels = [...document.querySelectorAll("[data-opening]")];
  document.getElementById("slide-total").textContent = slides.length;

  slides.forEach((_, dotIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", slides[dotIndex].label || `Go to section ${dotIndex - openingSlides.length + 1}`);
    dot.addEventListener("click", () => show(dotIndex));
    dots.append(dot);
  });

  function show(nextIndex) {
    index = Math.min(Math.max(nextIndex, 0), slides.length - 1);
    const slide = slides[index];
    const isSection = slide.type === "section";
    sectionSlide.hidden = !isSection;
    openingPanels.forEach(panel => { panel.hidden = isSection || panel.dataset.opening !== slide.type; });
    if (isSection) {
      const section = slide.section;
      number.textContent = section.number;
      label.textContent = `SECTION ${index - openingSlides.length + 1} · ${section.years}`;
      title.textContent = section.title;
      bigIdea.textContent = section.bigIdea;
      keyPoints.replaceChildren();
      section.presenterPoints.forEach(point => {
        const item = document.createElement("li");
        item.textContent = point;
        keyPoints.append(item);
      });
    }
    current.textContent = index + 1;
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    [...dots.children].forEach((dot, dotIndex) => {
      dot.classList.toggle("is-current", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "step" : "false");
    });
    history.replaceState(null, "", `${location.pathname}?slide=${index + 1}`);
  }

  previous.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  fullscreen.addEventListener("click", async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  });
  document.addEventListener("fullscreenchange", () => {
    fullscreen.textContent = document.fullscreenElement ? "EXIT FULL SCREEN" : "FULL SCREEN";
  });
  document.addEventListener("keydown", event => {
    if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); show(index + 1); }
    if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); show(index - 1); }
    if (event.key === "Home") show(0);
    if (event.key === "End") show(slides.length - 1);
  });

  show(index);
})();

function calculateReadingProgress(scrollY, maxScroll) {
  if (!Number.isFinite(maxScroll) || maxScroll <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / maxScroll));
}

(function () {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  const readingPage = document.querySelector(".case-page, .doc-page, .reader, .page-main");
  if (!readingPage) return;

  const track = document.createElement("div");
  track.className = "reading-progress";
  track.setAttribute("aria-hidden", "true");

  const fill = document.createElement("span");
  fill.className = "reading-progress__fill";
  track.appendChild(fill);
  document.body.appendChild(track);

  let framePending = false;

  function updateProgress() {
    framePending = false;
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const maxScroll = Math.max(0, documentHeight - window.innerHeight);
    fill.style.transform = "scaleX(" + calculateReadingProgress(window.scrollY, maxScroll) + ")";
  }

  function scheduleUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateProgress);
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("load", scheduleUpdate, { once: true });
  updateProgress();
})();

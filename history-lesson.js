(() => {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 0;
    bar.style.width = `${percent}%`;
  };
  update();
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);

  const investigations = [
    "revolutionary-fear", "articles-government", "government-too-weak", "government-too-weak",
    "constitutional-convention", "representation-compromises", "constitutional-convention",
    "constitutional-convention", "ratification-debate", "ratification-rights"
  ];
  document.querySelectorAll(".moment").forEach((moment, index) => {
    const story = moment.querySelector(".story");
    const link = document.createElement("a");
    link.className = "investigate-link";
    link.href = `history-research.html?stage=${investigations[index]}`;
    link.textContent = "OPEN THIS INVESTIGATION →";
    story.append(link);
  });
})();

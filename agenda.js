(() => {
  const key = "apg-agenda-v1";
  const defaults = { title: "AGENDA", copy: "COMING SOON." };
  const read = () => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(key) || "{}") }; }
    catch { return defaults; }
  };
  const render = () => {
    const value = read();
    document.querySelector("#agenda-title").textContent = value.title;
    document.querySelector("#agenda-copy").textContent = value.copy;
  };
  const now = new Date();
  document.querySelector("#agenda-weekday").textContent = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "America/Los_Angeles" }).format(now);
  const date = document.querySelector("#agenda-date");
  date.textContent = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "America/Los_Angeles" }).format(now);
  date.dateTime = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(now);
  const dialog = document.querySelector("#agenda-dialog");
  document.querySelector("#agenda-edit").addEventListener("click", () => {
    const value = read();
    document.querySelector("#agenda-title-input").value = value.title;
    document.querySelector("#agenda-copy-input").value = value.copy;
    dialog.showModal();
  });
  document.querySelector("#agenda-form").addEventListener("submit", event => {
    if (event.submitter?.value !== "save") return;
    event.preventDefault();
    localStorage.setItem(key, JSON.stringify({
      title: document.querySelector("#agenda-title-input").value.trim().toUpperCase() || defaults.title,
      copy: document.querySelector("#agenda-copy-input").value.trim()
    }));
    render();
    dialog.close();
  });
  document.querySelector("#agenda-copy-button").addEventListener("click", async () => {
    const value = read();
    await navigator.clipboard.writeText(`${value.title}\n\n${value.copy}`);
    document.querySelector("#agenda-copy-button").textContent = "Copied";
  });
  render();
})();

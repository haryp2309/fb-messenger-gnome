document.getElementById("closeButton").addEventListener("click", (e) => {
  e.preventDefault();
  window.electronAPI.closeApp();
});

window.electronAPI.setOnMaximizeChanged((isMaximized) => {
  if (isMaximized) {
    document.getElementById("window").classList.add("maximized");
  } else {
    document.getElementById("window").classList.remove("maximized");
  }
});

function loadSettings() {
  const noShadowString = window.localStorage.getItem("noShadow");
  const noShadow = noShadowString === "true";

  const w = document.getElementById("window");

  if (noShadow) {
    w.classList.add("noShadow");
  } else {
    w.classList.remove("noShadow");
  }
}

window.electronAPI.setOnShowShadowChannged(() => {
  const noShadowString = window.localStorage.getItem("noShadow");
  const currentNoShadow = noShadowString === "true";
  window.localStorage.setItem("noShadow", JSON.stringify(!currentNoShadow));
  loadSettings();
});

loadSettings();

// close app
function closeApp(e) {
  e.preventDefault();
  window.electronAPI.closeApp();
}

document.getElementById("closeButton").addEventListener("click", closeApp);

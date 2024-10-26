function closeApp(e) {
  e.preventDefault();
  window.electronAPI.closeApp();
}

document.getElementById("closeButton").addEventListener("click", closeApp);

function handleMaximizeChanged(isMaximized) {
  if (isMaximized) {
    document.getElementById("window").classList.add("maximized");
  } else {
    document.getElementById("window").classList.remove("maximized");
  }
}

window.electronAPI.onMaximizeChanged(handleMaximizeChanged);

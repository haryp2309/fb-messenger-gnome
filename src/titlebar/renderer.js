// close app
function closeApp(e) {
  e.preventDefault();
  window.electronAPI.closeApp();
}

document.getElementById("closeButton").addEventListener("click", closeApp);

window.electronAPI.onCtrlK(() => {
  // closeApp({ preventDefault: () => {} });
  // window.alert("hi");
  try {
    window.electronAPI.debugLog(
      document.querySelector("input[aria-label='Search Messenger']")
        .placeholder,
    );
    window.document
      .querySelector("input[aria-label='Search Messenger']")
      .click();
  } catch (e) {
    window.electronAPI.debugLog("Something went wrong");
    window.electronAPI.debugLog(e);
  }
});

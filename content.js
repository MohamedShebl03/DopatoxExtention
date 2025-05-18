window.addEventListener("beforeunload", () => {
  try {
    if (typeof chrome !== "undefined" && chrome.runtime && typeof chrome.runtime.sendMessage === "function") {
      chrome.runtime.sendMessage({ type: "leaveYouTube", time: Date.now() });
    } else {
      console.warn("chrome.runtime.sendMessage is not available");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
});

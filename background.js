const tabData = {}; // Store data for all tabs: { tabId: { domain, startTime, totalTime } }

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    await updateActiveTab(tabId);
    removeBodyContentIfBlocked(tabId);
  }
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // No window focused, pause timing for all tabs
    pauseAllTabs();
  } else {
    // Window focused, update active tab in that window
    const [tab] = await chrome.tabs.query({ active: true, windowId: windowId });
    if (tab) {
      await updateActiveTab(tab.id);
    }
  }
});

async function updateActiveTab(newTabId) {
  const now = Date.now();

  // Pause timing on previously active tab
  for (const tabId in tabData) {
    if (tabData[tabId].isActive) {
      const elapsed = now - tabData[tabId].startTime;
      tabData[tabId].totalTime += elapsed;
      tabData[tabId].isActive = false;
      console.log(`Tab ${tabId} (${tabData[tabId].domain}) paused, time spent: ${tabData[tabId].totalTime} ms`);
    }
  }

  // Start timing on new active tab
  let tabInfo = tabData[newTabId];
  if (!tabInfo) {
    const tab = await chrome.tabs.get(newTabId);
    const domain = extractDomain(tab.url);
    tabInfo = {
      domain: domain,
      startTime: now,
      totalTime: 0,
      isActive: true,
      favIconUrl: tab.favIconUrl || null
    };
    tabData[newTabId] = tabInfo;
  } else {
    tabInfo.startTime = now;
    tabInfo.isActive = true;
  }
  console.log(`Tab ${newTabId} (${tabInfo.domain}) activated`);
}

function pauseAllTabs() {
  const now = Date.now();
  for (const tabId in tabData) {
    if (tabData[tabId].isActive) {
      const elapsed = now - tabData[tabId].startTime;
      tabData[tabId].totalTime += elapsed;
      tabData[tabId].isActive = false;
      console.log(`Tab ${tabId} (${tabData[tabId].domain}) paused, time spent: ${tabData[tabId].totalTime} ms`);
    }
  }
}

function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return null;
  }
}

// Periodically log all tab usage data to console
setInterval(() => {
  console.log("Current tab usage data:");
  for (const tabId in tabData) {
    const data = tabData[tabId];
    console.log(`Tab ${tabId}: Domain=${data.domain}, TimeSpent=${data.totalTime} ms${data.isActive ? " (active)" : ""}, Favicon=${data.favIconUrl || "N/A"}`);

  }
}, 60000); // every 60 seconds



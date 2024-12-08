// background.js

let activeTweet = null;

// Listener for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setActiveTweet") {
    activeTweet = request.tweet;
    console.log("Tweet stored:", activeTweet);  // Debug log
    sendResponse({ status: "Tweet saved" });
  } else if (request.action === "getActiveTweet") {
    console.log("Sending active tweet:", activeTweet);  // Debug log
    sendResponse({ tweet: activeTweet });
  }
});

chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
    if (frameId === 0) { // Ensure this is the top frame
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"]
      });
    }
  }, { url: [{ hostSuffix: "x.com" }] });

  
  chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.includes("x.com")) {
      // Reload the page
      chrome.tabs.reload(tab.id, {}, () => {
        console.log("Page reloaded.");
        // Reinject content script after reload
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        });
      });
    } else {
      console.log("This extension works only on x.com.");
    }
  });
  
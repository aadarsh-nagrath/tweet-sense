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

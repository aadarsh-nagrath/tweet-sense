(() => {
  function getActiveTweet() {
    const tweetElement = document.querySelector('div[data-testid="tweetText"]');

    if (tweetElement) {
        return tweetElement.textContent.trim();
    } else {
        return null;
    }
  }

  function tryGetTweet() {
    const activeTweet = getActiveTweet();
    if (activeTweet) {
      try {
        chrome.runtime.sendMessage({
            action: "setActiveTweet",
            tweet: activeTweet
        }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError);
            }
        });
      } catch (error) {
        console.error("Error in message sending:", error);
      }
    }
    setTimeout(tryGetTweet, 1000); // Retry every second
  }

  // Initialize the script
  tryGetTweet();
})();

(() => {
  function getActiveTweet() {
    const tweetElement = document.querySelector('div[data-testid="tweetText"]');
    return tweetElement ? tweetElement.textContent.trim() : null;
  }

  function tryGetTweet() {
    try {
      const activeTweet = getActiveTweet();
      if (activeTweet) {
          chrome.runtime.sendMessage(
            { action: "setActiveTweet", tweet: activeTweet },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError);
              }
            }
          );
      }
    } catch (contextError) {} 
      setTimeout(tryGetTweet, 1000);
  }

  // Initialize the script
  tryGetTweet();
})();

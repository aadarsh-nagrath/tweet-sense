// Listen for clicks to detect tweets
document.addEventListener("click", (event) => {
    const tweetElement = event.target.closest('[data-testid="tweet"]');
    if (tweetElement) {
      const tweetTextElement = tweetElement.querySelector('[lang]');
      if (tweetTextElement) {
        const tweetText = tweetTextElement.innerText;
  
        console.log("Detected tweet text:", tweetText);
  
        chrome.runtime.sendMessage({ action: "fetchReply", tweetText });
      } else {
        console.error("Tweet text element not found.");
      }
    }
  });
  
  // Listen for messages from the background script to display the reply
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "displayReply") {
      console.log("Received reply:", message.reply);
  
      const replyBox = document.querySelector('[data-testid="tweetTextarea_0"]');
      if (replyBox) {
        replyBox.value = message.reply; // Pre-fill the reply box
      } else {
        console.error("Reply box not found.");
      }
    }
  });
  
chrome.runtime.sendMessage({ action: "getActiveTweet" }, (response) => {
  const tweetContainer = document.getElementById("tweet-container");
  if (response && response.tweet) {
    console.log("Received tweet in popup:", response.tweet);  // Debug log
    tweetText.innerHTML = `${response.tweet}`;
  } else {
    console.log("No tweet found in background.");  // Debug log
    tweetContainer.innerHTML = `<p>No active tweet detected.</p>`;
  }
});

document.getElementById("fetchButton").addEventListener("click", () => {
    console.log("Button clicked");
  
    const tweetText = document.getElementById("tweetText").value.trim();
    const tags = Array.from(document.querySelectorAll(".tag")).map((tag) =>
      tag.textContent.trim()
    );
  
    if (!tweetText) {
      alert("Please enter or paste a tweet.");
      return;
    }
  
    const fetchButton = document.getElementById("fetchButton");
    const replySection = document.getElementById("replySection");
    const generatedReply = document.getElementById("generatedReply");
  
    fetchButton.disabled = true;
    fetchButton.innerText = "Loading...";
    replySection.style.display = "none";
  
    const requestBody = {
      tweetText: tweetText,
      prompt: "Just directly provide a reply to this tweet ",
      attributes: "Also make the tweet " + tags.join(", "), // Send tags as a comma-separated string
    };
  
    // Fetch data from your backend server
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gemini-endpoint.vercel.app/api/generate-reply",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
  
        const data = await response.json();
        console.log("Backend response:", data);
  
        if (data && data.reply) {
          const reply = data.reply;
          console.log("Generated reply:", reply);
  
          generatedReply.textContent = reply;
          replySection.style.display = "block";
        } else {
          console.error("Invalid response from backend:", data);
          alert("Failed to generate a reply. Please try again.");
        }
      } catch (error) {
        console.error("Error calling backend server:", error);
        alert("Error generating reply. Please try again.");
      } finally {
        fetchButton.disabled = false;
        fetchButton.innerText = "Generate Reply";
      }
    };
  
    fetchData();
  });
  
  // Handle tag input
  const tagInput = document.getElementById("tagInput");
  const tagDisplay = document.getElementById("tagDisplay");
  
  tagInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      const tag = tagInput.value.trim();
  
      if (tag && !Array.from(tagDisplay.children).some(el => el.textContent === tag)) {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tagElement.classList.add("tag");
        tagElement.style.cssText = `
          display: inline-block;
          background-color: #e0e0e0;
          color: #333;
          padding: 5px 10px;
          margin-right: 5px;
          border-radius: 3px;
          cursor: pointer;
        `;
  
        // Add delete functionality to tag
        tagElement.addEventListener("click", () => {
          tagElement.remove();
        });
  
        tagDisplay.appendChild(tagElement);
        tagInput.value = ""; // Clear input
      }
    }
  });
  
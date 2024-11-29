document.getElementById("fetchButton").addEventListener("click", () => {
    console.log("Button clicked");

    const tweetText = document.getElementById("tweetText").value.trim();

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
        prompt: "Please provide reply to this tweet directly",
        attributes: "make it cool, witty, short,emojies :"
    };

    // Fetch data from your backend server
    const fetchData = async () => {
        try {
            const response = await fetch('YOUR_GEMINI_ENDPOINT&API_KEY', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

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

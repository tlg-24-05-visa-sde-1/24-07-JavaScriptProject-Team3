async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = userInput;
  chatBox.appendChild(userMessage);

  document.getElementById("user-input").value = "";

  // Post request to chat gpt
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // removed key
      Authorization: `Bearer removed for now`,
    },
    // body of request
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are WanderWise, a helpful assistant designed to assist travelers in navigating between attractions in various locations. Provide clear route guidance, background on the transportation method, the best route, and a step-by-step explanation on how to get there. Check online for any current events or obstructions that might affect the route. Avoid creative directions and focus on practical and accurate travel advice. Your tone is excited and extra helpful, similar to a tour guide.",
        },
        { role: "user", content: userInput },
      ],
      max_tokens: 550,
      temperature: 0.5,
      stream: true,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let botMessage = document.createElement("div");
  botMessage.className = "message bot";
  chatBox.appendChild(botMessage);

  // read the stream
  async function readStream() {
    while (true) {
      // read a chunk from stream
      const { done, value } = await reader.read();
      // if stream is done, finish
      if (done) {
        break;
      }

      // chunk of data to a string
      const chunk = decoder.decode(value, { stream: true });
      // take out empty lines
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");
      // each line
      for (const line of lines) {
        // on do lines that start with data:
        if (line.startsWith("data: ")) {
          // remove that data:
          const json = line.replace(/^data: /, "");
          // at the end is [DONE]
          if (json === "[DONE]") {
            break;
          }
          // parse it here
          try {
            const parsed = JSON.parse(json);
            // get the content from parsed
            const content = parsed.choices[0].delta.content;

            // append to bot message and update the chat box
            if (content) {
              botMessage.textContent += content;
              chatBox.scrollTop = chatBox.scrollHeight;
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      }
    }
  }
  readStream();
}

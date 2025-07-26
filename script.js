const chatWith = localStorage.getItem('chatWith') || 'Luna';
document.getElementById('chat-title').innerText = chatWith;

const chatArea = document.getElementById('chat');

function goBack() {
  window.location.href = 'index.html';
}

function appendMessage(text, sender = 'user') {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.classList.add(sender);
  msg.textContent = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('message');
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage(userText, 'user');
  input.value = '';

  // Talk to AI backend (OpenRouter example)
  const systemPrompt = `You are ${chatWith}, a cute anime girl texting with a user. Be flirty, realistic, and clever.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
     "Authorization": "Bearer sk-openrouter-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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userText }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  appendMessage(reply, 'bot');
}

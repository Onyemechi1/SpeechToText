

let recognition;
let isRecording = false;

document
  .getElementById("recordButton")
  .addEventListener("click", startRecording);
document.getElementById("stopButton").addEventListener("click", stopRecording);
document
  .getElementById("translateButton")
  .addEventListener("click", translateText);
document
  .getElementById("downloadButton")
  .addEventListener("click", downloadText);

function startRecording() {
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRecording = true;
      document.getElementById("recordButton").disabled = true;
      document.getElementById("stopButton").disabled = false;
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      document.getElementById("textResult").value += transcript;
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
    };

    recognition.onend = () => {
      isRecording = false;
      document.getElementById("recordButton").disabled = false;
      document.getElementById("stopButton").disabled = true;
    };

    recognition.start();
  } else {
    alert("Your browser does not support speech recognition.");
  }
}

function stopRecording() {
  if (isRecording) {
    recognition.stop();
    document.getElementById("stopButton").disabled = true;
    document.getElementById("recordButton").disabled = false;
  }
}

document
  .getElementById("translateButton")
  .addEventListener("click", translateText);
document
  .getElementById("downloadButton")
  .addEventListener("click", downloadText);

async function translateText() {
  const text = document.getElementById("textResult").value;
  const targetLanguage = document.getElementById("languageSelect").value;
  const translatedText = await translateTextAPI(text, targetLanguage);
  document.getElementById("translatedText").value = translatedText;
}

async function translateTextAPI(text, targetLanguage) {
  const apiKey = "YOUR-API-KEY"; // Replace with your actual API key
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
      source: "en",
    }),
  });

  const data = await response.json();
  return data.data.translations[0].translatedText;
}

function downloadText() {
  const translatedText = document.getElementById("translatedText").value;
  const blob = new Blob([translatedText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "translated_text.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


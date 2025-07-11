const apiKey = "sk_fc18ee62feb984bad35b07391bf06f5b06acee71e64df2a1";
const voiceId = "XA2bIQ92TabjGbpO2xRr";

const textInput = document.getElementById("textInput");
const speakBtn = document.getElementById("speakBtn");
const statusDiv = document.getElementById("status");

speakBtn.onclick = async () => {
  const text = textInput.value.trim();
  if (!text) {
    alert("يرجى كتابة نص للتحويل");
    return;
  }

  statusDiv.textContent = "جاري التحويل... الرجاء الانتظار";

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      statusDiv.textContent = "حدث خطأ: " + err;
      return;
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();

    statusDiv.textContent = "تشغيل الصوت...";

  } catch (error) {
    statusDiv.textContent = "حدث خطأ في الاتصال بال API";
  }
};


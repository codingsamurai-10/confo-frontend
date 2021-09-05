let SpeechRecognition = null,
  recognition = null,
  finalTranscript = null;
try {
  SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
} catch (error) {
  console.log("webkitSpeechRecognition Not Found...");
}
const MicrophoneInputConfig = {
  init: function () {},
  awaitingCallback: true,
  //TODO: fix cancelInput call at each keypress
  input: function (resolve, reject, mediaStream) {
    if (recognition) recognition.stop();
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true; //set to true to stop endless listening
    finalTranscript = "";
    recognition.onresult = function (event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
    };
    recognition.onerror = function (event) {
      reject(event.error);
    };
    recognition.onend = function (event) {
      if (finalTranscript && finalTranscript !== "") {
        resolve(finalTranscript);
      }
    };
    recognition.start();
  },
  cancelInput: function () {
    finalTranscript = null;
    if (recognition) {
      recognition.onend = null;
      recognition.onerror = null;
      recognition.stop();
    }
  },
};
export default MicrophoneInputConfig;

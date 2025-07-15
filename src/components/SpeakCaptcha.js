import React from 'react';

const SpeakCaptcha = ({ pin, isSpeaking, onSpeakStart, onSpeakEnd }) => {
  const handleSpeak = () => {
    if (isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance(pin.split('').join(' '));
    utterance.lang = 'en-US';
    utterance.rate = 1;

    onSpeakStart(); // Tell parent we're speaking
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      onSpeakEnd(); // Reset speaking state
    };
  };

  return (
    <div className="mb-4 row align-items-center">
      <label className="col-sm-5 col-form-label fw-bold">Listen Security Pin Audio</label>
      <div className="col-sm-7">
        <button
          className="btn btn-outline-secondary d-flex align-items-center justify-content-center position-relative"
          type="button"
          onClick={handleSpeak}
          disabled={isSpeaking}
          style={{ minWidth: '180px' }}
        >
          <i className="bi bi-volume-up me-2"></i>
          {isSpeaking ? (
            <span className="d-flex align-items-center">
              Speaking
              <span className="dot ms-1"></span>
              <span className="dot ms-1"></span>
              <span className="dot ms-1"></span>
            </span>
          ) : (
            "Play Security Pin"
          )}
        </button>
      </div>
    </div>
  );
};

export default SpeakCaptcha;
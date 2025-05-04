
import { useState } from 'react';

export const useTextToSpeech = () => {
  const speakText = (text: string) => {
    if ('speechSynthesis' in window && text) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'es-ES';
      speech.rate = 1.0;
      speech.pitch = 1.0;
      window.speechSynthesis.speak(speech);
    }
  };

  return {
    speakText
  };
};

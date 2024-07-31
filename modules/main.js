
import { initTranslation, translateText } from './translation.js';  // Import translation functions. D.W

// Add event listener to the translate button. D.W
document.getElementById('translate-button').addEventListener('click', () => {
    const text = document.getElementById('translate-input').value;  // Get the input text. D.W
    const sourceLanguage = document.getElementById('from-language-select').value;  // Get the source language. D.W
    const targetLanguage = document.getElementById('to-language-select').value;  // Get the target language. D.W
    if (text && targetLanguage) {
        translateText(text, sourceLanguage, targetLanguage);  // Call the translate function. D.W
    }
});

// Initialize the translation module when the DOM content is loaded. D.W
document.addEventListener('DOMContentLoaded', initTranslation);

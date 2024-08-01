import { getCuisines } from './food.js';
import { initTranslation, translateText } from './translation.js';
import { sendMessage } from './transport.js';
import { searchAttractions } from './attractions.js';

document.addEventListener('DOMContentLoaded', () => {
    initTranslation();

    const translateButton = document.getElementById('translate-button');
    const cuisineSearchButton = document.getElementById('cuisine-search-button');
    const searchButton = document.getElementById('search-button');
    const getDirectionsButton = document.getElementById('get-directions-button');

    if (translateButton) {
        translateButton.addEventListener('click', () => {
            const text = document.getElementById('translate-input').value;
            const sourceLanguage = document.getElementById('from-language-select').value;
            const targetLanguage = document.getElementById('to-language-select').value;
            if (text && targetLanguage) {
                translateText(text, sourceLanguage, targetLanguage);
            }
        });
    }

    if (cuisineSearchButton) {
        cuisineSearchButton.addEventListener('click', () => {
            getCuisines();
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            searchAttractions();
        });
    }

    if (getDirectionsButton) {
        getDirectionsButton.addEventListener('click', () => {
            sendMessage();
        });
    }
});

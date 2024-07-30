// Your Azure subscription key for the Translator Text API. D.W
const subscriptionKey = '444fd96b85e84dd0be784e7d8cbe1655';

// Endpoint for the Translator Text API. D.W
const textTranslationEndpoint = 'https://api.cognitive.microsofttranslator.com';

// The region for your Azure subscription. D.W
const location = 'centralus';

// Object containing language codes and their corresponding names. D.W
const languageOptions = {
    'af': 'Afrikaans', 'sq': 'Albanian', 'am': 'Amharic', 'ar': 'Arabic', 'hy': 'Armenian', 'az': 'Azerbaijani', 'eu': 'Basque',
    'be': 'Belarusian', 'bn': 'Bengali', 'bs': 'Bosnian', 'bg': 'Bulgarian', 'ca': 'Catalan', 'ceb': 'Cebuano', 'ny': 'Chichewa',
    'zh-Hans': 'Chinese (Simplified)', 'zh-Hant': 'Chinese (Traditional)', 'co': 'Corsican', 'hr': 'Croatian', 'cs': 'Czech',
    'da': 'Danish', 'nl': 'Dutch', 'en': 'English', 'eo': 'Esperanto', 'et': 'Estonian', 'tl': 'Filipino', 'fi': 'Finnish',
    'fr': 'French', 'fy': 'Frisian', 'gl': 'Galician', 'ka': 'Georgian', 'de': 'German', 'el': 'Greek', 'gu': 'Gujarati',
    'ht': 'Haitian Creole', 'ha': 'Hausa', 'haw': 'Hawaiian', 'he': 'Hebrew', 'hi': 'Hindi', 'hmn': 'Hmong', 'hu': 'Hungarian',
    'is': 'Icelandic', 'ig': 'Igbo', 'id': 'Indonesian', 'ga': 'Irish', 'it': 'Italian', 'ja': 'Japanese', 'jw': 'Javanese',
    'kn': 'Kannada', 'kk': 'Kazakh', 'km': 'Khmer', 'rw': 'Kinyarwanda', 'ko': 'Korean', 'ku': 'Kurdish (Kurmanji)', 'ky': 'Kyrgyz',
    'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian', 'lt': 'Lithuanian', 'lb': 'Luxembourgish', 'mk': 'Macedonian', 'mg': 'Malagasy',
    'ms': 'Malay', 'ml': 'Malayalam', 'mt': 'Maltese', 'mi': 'Maori', 'mr': 'Marathi', 'mn': 'Mongolian', 'my': 'Myanmar (Burmese)',
    'ne': 'Nepali', 'no': 'Norwegian', 'or': 'Odia (Oriya)', 'ps': 'Pashto', 'fa': 'Persian', 'pl': 'Polish', 'pt': 'Portuguese',
    'pa': 'Punjabi', 'ro': 'Romanian', 'ru': 'Russian', 'sm': 'Samoan', 'gd': 'Scots Gaelic', 'sr': 'Serbian', 'st': 'Sesotho',
    'sn': 'Shona', 'sd': 'Sindhi', 'si': 'Sinhala', 'sk': 'Slovak', 'sl': 'Slovenian', 'so': 'Somali', 'es': 'Spanish', 'su': 'Sundanese',
    'sw': 'Swahili', 'sv': 'Swedish', 'tg': 'Tajik', 'ta': 'Tamil', 'tt': 'Tatar', 'te': 'Telugu', 'th': 'Thai', 'tr': 'Turkish',
    'tk': 'Turkmen', 'uk': 'Ukrainian', 'ur': 'Urdu', 'ug': 'Uyghur', 'uz': 'Uzbek', 'vi': 'Vietnamese', 'cy': 'Welsh', 'xh': 'Xhosa',
    'yi': 'Yiddish', 'yo': 'Yoruba', 'zu': 'Zulu'
};

// Initialize the translation functionality. D.W
export async function initTranslation() {
    try {
        console.log("Initializing translation...");  // Log initialization message. D.W
        populateLanguageSelect(languageOptions);     // Populate the language select elements with options. D.W
    } catch (error) {
        console.error('Error initializing translation:', error);  // Log any errors during initialization. D.W
    }
}

// Populate the language select dropdowns with options. D.W
function populateLanguageSelect(languages) {
    const fromLanguageSelect = document.getElementById('from-language-select');  // Get the "from" language select element. D.W
    const toLanguageSelect = document.getElementById('to-language-select');      // Get the "to" language select element. D.W

    // Loop through the languages and add options to the select elements. D.W
    for (const [code, name] of Object.entries(languages)) {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');
        optionFrom.value = code;
        optionTo.value = code;
        optionFrom.textContent = name;
        optionTo.textContent = name;
        fromLanguageSelect.appendChild(optionFrom);  // Add option to the "from" language select. D.W
        toLanguageSelect.appendChild(optionTo);      // Add option to the "to" language select. D.W
    }
    console.log("Language select populated with options");  // Log message indicating language options have been populated. D.W
}

// Translate text using the Azure Translator Text API. D.W
export async function translateText(text, sourceLanguage, targetLanguage) {
    try {
        console.log(`Translating text: "${text}" from language: "${sourceLanguage}" to language: "${targetLanguage}"`);  // Log the translation request. D.W
        const requestBody = [{
            Text: text  // Request body containing the text to translate. D.W
        }];
        const params = new URLSearchParams({
            'api-version': '3.0'  // API version parameter. D.W
        });
        if (sourceLanguage !== 'auto') {
            params.append('from', sourceLanguage);  // Append source language if not auto-detect. D.W
        }
        params.append('to', targetLanguage);  // Append target language. D.W

        const response = await fetch(`${textTranslationEndpoint}/translate?${params}`, {
            method: 'POST',  // Use POST method for the request. D.W
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,  // Subscription key for authentication. D.W
                'Ocp-Apim-Subscription-Region': location,      // Subscription region. D.W
                'Content-Type': 'application/json',            // Content type of the request. D.W
            },
            body: JSON.stringify(requestBody),  // Request body as a JSON string. D.W
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);  // Throw an error if the response is not OK. D.W
        }

        const data = await response.json();  // Parse the JSON response. D.W
        console.log("Translation response:", data);  // Log the translation response. D.W
        displayTranslation(data[0].translations[0].text);  // Display the translated text. D.W
    } catch (error) {
        console.error('Error translating text:', error);  // Log any errors during translation. D.W
    }
}

// Display the translated text in the output textarea. D.W
function displayTranslation(translatedText) {
    console.log("Displaying translated text:", translatedText);  // Log the translated text. D.W
    document.getElementById('translated-output').value = translatedText;  // Set the translated text in the output textarea. D.W
}

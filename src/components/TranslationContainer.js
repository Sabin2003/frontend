import React, { useState } from 'react';
import './TranslationContainer.css';
import LanguageControls from './LanguageControls';
import TranslationBoxes from './TranslationBoxes';
import ModelInfo from './ModelInfo';
import TranslationStats from './TranslationStats';

function TranslationContainer() {
  const [sourceLanguage, setSourceLanguage] = useState('french');
  const [targetLanguage, setTargetLanguage] = useState('bafia');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationStats, setTranslationStats] = useState({
    confidence: 0,
    processingTime: 0,
    wordCount: 0,
    sentenceCount: 0,
  });

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async () => {
      console.log(`Translating from ${sourceLanguage} to ${targetLanguage}: "${sourceText}"`);
      if (!sourceText.trim()) {
        setTranslatedText("Please enter text to translate.");
        return;
      }

      try {
        const start = Date.now();
        const response = await fetch('http://185.158.107.126:5001/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceLang: sourceLanguage,
            targetLang: targetLanguage,
            text: sourceText,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Gère à la fois 'translation' et 'translation' (faute de frappe dans le backend)
          const translation = data.translation || data.translation || "No translation found.";
          setTranslatedText(translation);
          
          const processingTime = ((Date.now() - start) / 1000).toFixed(2);
          const words = sourceText.split(/\s+/).filter(word => word.length > 0).length;
          const sentences = sourceText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;

          setTranslationStats({
            confidence: data.matchType === 'exact' ? 100 : 85, // Plus précis si match exact
            processingTime,
            wordCount: words,
            sentenceCount: sentences,
          });
        } else {
          setTranslatedText(data.error || data.message || "Translation failed.");
          setTranslationStats(prev => ({...prev, confidence: 0}));
        }
      } catch (error) {
        console.error("Error during translation:", error);
        setTranslatedText("Error connecting to the translation service.");
        setTranslationStats(prev => ({...prev, confidence: 0}));
      }
    };

  return (
    <div className="container">
      <h1>Translate from English and French to Bafia, Fulfulde (Adamawa)</h1>

      <div className="translator-container">
        <LanguageControls
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          setSourceLanguage={setSourceLanguage}
          setTargetLanguage={setTargetLanguage}
          onSwap={handleSwapLanguages}
        />

        <TranslationBoxes
          sourceText={sourceText}
          translatedText={translatedText}
          setSourceText={setSourceText}
          setTranslatedText={setTranslatedText}
        />

        <button className="translate-btn" onClick={handleTranslate}>Translate</button>

        <ModelInfo />

        <TranslationStats stats={translationStats} />
      </div>
    </div>
  );
}

export default TranslationContainer;

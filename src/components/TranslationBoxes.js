import React from 'react';
import './TranslationBoxes.css';

function TranslationBoxes({ sourceText, translatedText, setSourceText, setTranslatedText }) {
  const handleClearSource = () => {
    setSourceText('');
  };
  
  const handleCopySource = () => {
    navigator.clipboard.writeText(sourceText);
  };
  
  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(translatedText);
  };
  
  return (
    <div className="translation-boxes">
      <div className="translation-box">
        <div className="box-header">
          <span className="box-title">Source Text</span>
          <div className="box-actions">
            <button title="Clear text" onClick={handleClearSource}>✕</button>
            <button title="Copy text" onClick={handleCopySource}>📋</button>
            {/* <button title="Upload document">📄</button> */}
          </div>
        </div>
        <textarea 
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="Enter text to translate..."
        ></textarea>
      </div>
      
      <div className="translation-box">
        <div className="box-header">
          <span className="box-title">Translation</span>
          <div className="box-actions">
            <button title="Copy text" onClick={handleCopyTranslation}>📋</button>
            {/* <button title="Download translation">⬇️</button> */}
            {/* <button title="Listen">🔊</button> */}
          </div>
        </div>
        <textarea 
          value={translatedText}
          placeholder="Translation will appear here..." 
          readOnly
        ></textarea>
      </div>
      
    </div>
  );
}

export default TranslationBoxes;

// <div className='test'>
//         <p>Disclaimer: This AI-powered tool is provided solely for intertainment and creative purposes and is not guaranteed to be accurate. For critical needs, please consults professional translators. </p>
//       </div>
import React from 'react';
import './LanguageControls.js';

function LanguageControls({ sourceLanguage, targetLanguage, setSourceLanguage, setTargetLanguage, onSwap }) {
  return (
    <div className="language-controls">
      <div className="language-selector">
        <label htmlFor="source-lang">From:</label>
        <select 
          id="source-lang" 
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
        >
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="bafia">Bafia</option>
          <option value="fulfulde">Fulfulde (Adamawa)</option>
        </select>
      </div>
      
      <button className="swap-btn" onClick={onSwap}>⇄</button>
      
      <div className="language-selector">
        <label htmlFor="target-lang">To:</label>
        <select 
          id="target-lang"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="bafia">Bafia</option>
          <option value="fulfulde">Fulfulde (Adamawa)</option>
          <option value="english">English</option>
          <option value="french">French</option>
        </select>
      </div>
    </div>
  );
}

export default LanguageControls;


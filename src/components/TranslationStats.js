import React from 'react';
import './TranslationStats.css';

function TranslationStats({ stats }) {
  return (
    <div className="translation-stats">
      <div className="stat-item">
        <span className="stat-value">{stats.confidence}%</span>
        <span className="stat-label">Confidence</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.processingTime}s</span>
        <span className="stat-label">Processing Time</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.wordCount}</span>
        <span className="stat-label">Words</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.sentenceCount}</span>
        <span className="stat-label">Sentences</span>
      </div>
    </div>
  );
}

export default TranslationStats;

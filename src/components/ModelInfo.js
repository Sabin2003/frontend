import React from 'react';
import './ModelInfo.css';

function ModelInfo() {
  return (
    <div className="model-info">
      <p><strong>Current Model:</strong> Hugging Face Transformers - Bafia-Fulfulde-Multilingual (v1.2)</p>
      <p>This translation is powered by a specialized model trained on Cameroonian low-resource languages.</p>
    </div>
  );
}

export default ModelInfo;
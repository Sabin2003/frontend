import React from 'react';
import './FeatureGrid.css';
import FeatureCard from './FeatureCard';

function FeatureGrid() {
  const features = [
    {
      icon: '🔍',
      title: 'Low-Resource Language Support',
      description: 'Specialized in Bafia and Fulfulde (Adamawa) translations with continuous model improvements.'
    },
    {
      icon: '🔄',
      title: 'Bidirectional Translation',
      description: 'Translate between any supported language pair with high accuracy.'
    },
    {
      icon: '📚',
      title: 'Cultural Context Preservation',
      description: 'Our model understands cultural nuances and idioms specific to Cameroonian languages.'
    },
    {
      icon: '🔊',
      title: 'Text-to-Speech',
      description: 'Listen to correct pronunciations in Bafia and Fulfulde to improve language learning.'
    }
  ];
  
  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}

export default FeatureGrid;
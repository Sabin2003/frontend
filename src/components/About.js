import React from 'react';
import './About.css';
import Header from './Header';
import Footer from './Footer';

function About() {
  return (
    <div className="app">
      <Header />
      <main className="about-main">
        <div className="about-container">
          <h1 className="about-title">About MboaTranslate</h1>
          
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              CamTranslate is dedicated to preserving and promoting Cameroon's linguistic diversity through 
              cutting-edge AI translation technology. We focus specifically on the low-resource languages 
              Bafia and Fulfulde (Adamawa), which are vital to Cameroon's cultural heritage but 
              underrepresented in modern digital tools.
            </p>
          </section>
          
          <section className="about-section">
            <h2>The Research Project</h2>
            <p>
              This web application is part of an ongoing research project: "Developing a Web-Based Translation 
              Application for Low-Resource Cameroonian Languages Using Hugging Face Transformers: The Case of 
              Bafia and Fulfulde (Adamawa)."
            </p>
            <p>
              Our research aims to address the digital divide affecting minority languages by leveraging 
              transfer learning and the latest advances in natural language processing. By adapting 
              pre-trained transformer models to these low-resource languages, we're creating practical tools 
              while contributing to the field of computational linguistics.
            </p>
          </section>
          
          <div className="about-grid">
            <section className="about-card">
              <h2>Bafia Language</h2>
              <div className="language-info">
                <div className="language-stats">
                  <div className="stat">
                    <span className="stat-value">~85,000</span>
                    <span className="stat-label">Speakers</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">Centre Region</span>
                    <span className="stat-label">Location</span>
                  </div>
                </div>
                <p>
                  Bafia (or Rikpa) is a Bantu language spoken primarily in the Centre Region of Cameroon. 
                  Despite having tens of thousands of speakers, digital resources and NLP tools for Bafia 
                  remain extremely limited.
                </p>
              </div>
            </section>
            
            <section className="about-card">
              <h2>Fulfulde (Adamawa)</h2>
              <div className="language-info">
                <div className="language-stats">
                  <div className="stat">
                    <span className="stat-value">~450,000</span>
                    <span className="stat-label">Speakers in Cameroon</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">North Region</span>
                    <span className="stat-label">Location</span>
                  </div>
                </div>
                <p>
                  Fulfulde is a Senegambian language spoken across West and Central Africa. The Adamawa 
                  dialect is prevalent in northern Cameroon. While Fulfulde has more speakers than Bafia, 
                  the Adamawa variant remains underrepresented in language technology.
                </p>
              </div>
            </section>
          </div>
          
          <section className="about-section">
            <h2>Our Technology</h2>
            <p>
              CamTranslate leverages Hugging Face's transformer architecture to create a specialized neural 
              machine translation system. Our approach includes:
            </p>
            <ul className="tech-list">
              <li>
                <strong>Data Collection and Curation:</strong> Building parallel corpora for training through 
                community collaboration
              </li>
              <li>
                <strong>Fine-tuning:</strong> Adapting pre-trained multilingual models to Bafia and Fulfulde
              </li>
              <li>
                <strong>Cultural Context Preservation:</strong> Special attention to idiomatic expressions and 
                cultural nuances
              </li>
              <li>
                <strong>Web Accessibility:</strong> Creating an intuitive interface accessible to users with 
                varying levels of technical expertise
              </li>
            </ul>
          </section>
          
          <section className="about-section">
            <h2>Research Team</h2>
            <div className="team-container">
              <div className="team-member">
                <div className="member-avatar"></div>
                <h3>Dr. [Principal Investigator]</h3>
                <p>Lead Researcher, NLP Specialist</p>
              </div>
              <div className="team-member">
                <div className="member-avatar"></div>
                <h3>[Team Member]</h3>
                <p>Data Scientist, Model Development</p>
              </div>
              <div className="team-member">
                <div className="member-avatar"></div>
                <h3>[Team Member]</h3>
                <p>Linguistic Expert, Bafia Language</p>
              </div>
              <div className="team-member">
                <div className="member-avatar"></div>
                <h3>[Team Member]</h3>
                <p>Linguistic Expert, Fulfulde (Adamawa)</p>
              </div>
            </div>
          </section>
          
          <section className="about-section">
            <h2>Project Impact</h2>
            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-icon">🏛️</div>
                <h3>Cultural Preservation</h3>
                <p>Documenting and digitizing endangered languages</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">📱</div>
                <h3>Digital Inclusion</h3>
                <p>Bringing minority languages into the digital space</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">🔬</div>
                <h3>Research Advancement</h3>
                <p>Contributing to low-resource NLP research</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">🌍</div>
                <h3>Educational Tool</h3>
                <p>Supporting language learning and literacy</p>
              </div>
            </div>
          </section>
          
          <section className="about-section">
            <h2>Get Involved</h2>
            <p>
              We welcome contributions from researchers, linguists, developers, and native speakers of Bafia 
              and Fulfulde. If you'd like to participate in our project, please contact us at 
              <a href="mailto:contact@camtranslate.org"> contact@camtranslate.org</a>.
            </p>
          </section>
          
          <section className="about-section publications">
            <h2>Related Publications</h2>
            <ul className="publications-list">
              <li>
                <span className="publication-title">"Neural Machine Translation for Low-Resource Cameroonian Languages"</span>
                <span className="publication-authors">Authors et al. (2024)</span>
                <span className="publication-venue">Conference on Computational Linguistics</span>
              </li>
              <li>
                <span className="publication-title">"Building Parallel Corpora for Bafia and Fulfulde"</span>
                <span className="publication-authors">Authors et al. (2023)</span>
                <span className="publication-venue">Journal of African Linguistics</span>
              </li>
              <li>
                <span className="publication-title">"Adapting Transformer Models to Bafia: Challenges and Solutions"</span>
                <span className="publication-authors">Authors et al. (2023)</span>
                <span className="publication-venue">Workshop on Low-Resource Languages</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default About;
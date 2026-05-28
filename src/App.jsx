import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import GeneralSection from './components/GeneralSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ContactSection from './components/ContactSection.jsx';

function App() {
  // Initialize from localStorage (the user's saved choice), falling back to the
  // OS-level preference if no explicit choice has been stored yet
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Sync the theme to the <html> element each time it changes so CSS selectors like
  // :root[data-theme="dark"] can respond to it, and persist the choice across sessions
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Flip between light and dark on each toggle click
  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <GeneralSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;

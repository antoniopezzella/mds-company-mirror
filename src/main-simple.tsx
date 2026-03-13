import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Super simple test component
function SimpleTest() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'lightblue', minHeight: '100vh' }}>
      <h1 style={{ color: 'darkblue' }}>🔧 Simple Test - No Imports</h1>
      <p>If you see this, React is working fine.</p>
      <p>The blank screen was likely caused by:</p>
      <ul>
        <li>Theme provider error</li>
        <li>CSS import issue</li>
        <li>Component import problem</li>
        <li>Error boundary catching all errors</li>
      </ul>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpleTest />
  </StrictMode>,
)
export default function MinimalTest() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🟢 Minimal Test Page</h1>
      <p>If you see this, React is working!</p>
      <p>Date: {new Date().toISOString()}</p>
    </div>
  );
}
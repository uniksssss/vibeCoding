import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Weather from './components/Weather'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather App</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <main>
        <Weather />
      </main>
    </div>
  );
}

export default App

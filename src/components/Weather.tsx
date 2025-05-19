import { useState, useEffect } from 'react';
import '../styles/Weather.css';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const city = 'Moscow,ru';
        const apiKey = '96c29c393ba763b83c1bbbaeaa439928';

        // Прямой запрос к API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error Response:', errorData);
          throw new Error(errorData.message || 'Failed to fetch weather data');
        }

        const data = await response.json();
        console.log('Weather Data:', data);
        setWeatherData(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="weather-container">
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container">
        <div className="error-message">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>{weatherData.name}</h2>
        <div className="weather-main">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-value">{Math.round(weatherData.main.temp)}°C</span>
            <span className="feels-like">Feels like: {Math.round(weatherData.main.feels_like)}°C</span>
          </div>
        </div>
        <div className="weather-details">
          <div className="weather-condition">
            <h3>{weatherData.weather[0].main}</h3>
            <p>{weatherData.weather[0].description}</p>
          </div>
          <div className="weather-info">
            <div className="info-item">
              <span className="label">Wind Speed:</span>
              <span className="value">{weatherData.wind.speed} m/s</span>
            </div>
            <div className="info-item">
              <span className="label">Humidity:</span>
              <span className="value">{weatherData.main.humidity}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather; 
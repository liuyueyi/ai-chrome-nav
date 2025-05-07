// 天气信息更新间隔（1小时）
const WEATHER_UPDATE_INTERVAL = 3600000;

// 天气图标映射
const WEATHER_ICONS = {
  sunny: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>',
  cloudy: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>',
  rainy: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>'
};

class WeatherManager {
  constructor() {
    this.weatherIcon = document.querySelector('.weather-icon');
    this.weatherTemp = document.querySelector('.weather-temp');
    this.lastUpdate = 0;
  }

  async init() {
    await this.updateWeather();
    setInterval(() => this.updateWeather(), WEATHER_UPDATE_INTERVAL);
  }

  async updateWeather() {
    try {
      // 使用浏览器的地理位置API获取当前位置
    //   const position = await this.getCurrentPosition();
    //   const weather = await this.fetchWeather(position.coords.latitude, position.coords.longitude);
    //   this.updateUI(weather);
    } catch (error) {
      console.error('获取天气信息失败:', error);
      // 显示默认天气信息
      this.updateUI({ temp: '--', icon: 'sunny' });
    }
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('浏览器不支持地理位置'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async fetchWeather(lat, lon) {
    // 这里使用OpenWeatherMap API作为示例
    // 实际使用时需要替换为你的API Key
    const API_KEY = '';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('天气API请求失败');
    }

    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      icon: this.getWeatherIcon(data.weather[0].main)
    };
  }

  getWeatherIcon(condition) {
    const iconMap = {
      Clear: 'sunny',
      Clouds: 'cloudy',
      Rain: 'rainy',
      Snow: 'rainy',
      Thunderstorm: 'rainy',
      Drizzle: 'rainy',
      default: 'sunny'
    };
    return iconMap[condition] || iconMap.default;
  }

  updateUI(weather) {
    this.weatherTemp.textContent = `${weather.temp}°C`;
    this.weatherIcon.innerHTML = WEATHER_ICONS[weather.icon];
  }
}

// 初始化天气管理器
const weatherManager = new WeatherManager();
document.addEventListener('DOMContentLoaded', () => weatherManager.init());
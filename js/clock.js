// 更新时钟显示
function updateClock() {
  const now = new Date();
  const clockDisplay = document.getElementById('clock-display');
  const timeElement = clockDisplay.querySelector('.time');
  const dateElement = clockDisplay.querySelector('.date');

  // 更新时间
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}:${seconds}`;

  // 更新日期
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekday = weekdays[now.getDay()];
  dateElement.textContent = `${year}年${month}月${date}日 星期${weekday}`;
}

// 初始化时钟显示
function initClock() {
  const showClockCheckbox = document.getElementById('show-clock');
  const clockDisplay = document.getElementById('clock-display');

  const settings = JSON.parse(localStorage.getItem('settings') || '{}');
  showClockCheckbox.checked = settings.showClock !== undefined ? settings.showClock : true;

  // 根据复选框状态显示/隐藏时钟
  function toggleClock() {
    clockDisplay.style.display = showClockCheckbox.checked ? 'block' : 'none';
  }

  // 监听复选框变化
  showClockCheckbox.addEventListener('change', toggleClock);

  // 初始化时钟状态
  toggleClock();

  // 更新时钟并每秒更新一次
  updateClock();
  setInterval(updateClock, 1000);
}

// 页面加载完成后初始化时钟
document.addEventListener('DOMContentLoaded', initClock);
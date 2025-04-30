// 卡片视图模式切换功能

// 初始化视图模式
function initViewMode() {
  const viewToggleBtn = document.getElementById('view-toggle-btn');
  
  // 添加视图切换按钮点击事件
  viewToggleBtn.addEventListener('click', toggleViewMode);
}

// 切换视图模式
function toggleViewMode() {
  const mainContainer = document.querySelector('.main');
  const isCompactView = mainContainer.classList.toggle('compact-view');
  
  // 保存视图模式设置到本地存储
  const settings = JSON.parse(localStorage.getItem('settings') || '{}');
  settings.compactView = isCompactView;
  localStorage.setItem('settings', JSON.stringify(settings));
  
  // 同步更新设置面板中的复选框
  const compactViewCheckbox = document.getElementById('compact-view');
  if (compactViewCheckbox) {
    compactViewCheckbox.checked = isCompactView;
  }
}

// 页面加载完成后初始化视图模式
document.addEventListener('DOMContentLoaded', initViewMode);
// 卡片视图模式切换功能

// 初始化视图模式
function initViewMode() {
    const viewToggleBtn = document.getElementById('view-toggle-btn');

    // 添加视图切换按钮点击事件
    viewToggleBtn.addEventListener('click', toggleViewMode);
    autoUpdateIcon();
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

    autoUpdateIcon();
}

function autoUpdateIcon() {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    isCompactView = settings.compactView;
    if (isCompactView) {
        // 
        console.log('切换到紧凑视图');
        document.getElementById('view-toggle-btn').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-list h-4 w-4"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect><path d="M14 4h7"></path><path d="M14 9h7"></path><path d="M14 15h7"></path><path d="M14 20h7"></path></svg>'
    } else {
        // 切换到正常视图
        document.getElementById('view-toggle-btn').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>';
    }
}

// 页面加载完成后初始化视图模式
document.addEventListener('DOMContentLoaded', initViewMode);
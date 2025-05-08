
// 每日一句功能实现
async function fetchDailyQuote() {
    const mainTips = document.querySelector('.main-tips');
    if (!mainTips) return;

    // 添加加载状态
    mainTips.innerHTML = '<div class="loading">加载中...</div>';
    mainTips.style.opacity = '0.6';

    try {
        // const response = await fetch('https://open.iciba.com/dsapi/');
        const response = await fetch('https://v2.jinrishici.com/one.json');
        // const response = await fetch('http://v3.wufazhuce.com:8000/api/channel/one/0/0');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        data = data.data;
        console.log('每日一句:', data);
        // 创建内容元素
        let contents = '';
        // 处理内容
        for (let sub of data.origin.content) {
            contents += `<div class="quote-text">${sub}</div>`;
        }
        const quoteHTML = `
        <div class="daily-quote" style="opacity: 0">
          <div class="quote-title">${data.origin.title} </div>
          <div class="quote-author">${data.origin.dynasty} - ${data.origin.author}</div>
          <div class="quote-translation">${contents}</div>
        </div>
      `;

        // 更新内容
        mainTips.innerHTML = quoteHTML;

        // 添加淡入动画
        const quoteElement = mainTips.querySelector('.daily-quote');
        if (quoteElement) {
            setTimeout(() => {
                quoteElement.style.transition = 'opacity 0.5s ease-in';
                quoteElement.style.opacity = '1';
            }, 100);
        }

        // 设置css样式中的变量 --bg-img
        document.documentElement.style.setProperty('--bg-img', `${data.picture}`);

    } catch (error) {
        console.error('获取每日一句失败:', error);
        mainTips.innerHTML = '<div class="error">获取每日一句失败，请稍后重试</div>';
    }
}
// 页面加载时初始化主题
document.addEventListener("DOMContentLoaded", () => {
    // 获取每日一句
    fetchDailyQuote();
});
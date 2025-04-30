// 监听插件图标点击事件
try {
  chrome.action.onClicked.addListener(async (tab) => {
    try {
      // 获取当前标签页信息
      const currentTab = await chrome.tabs.query({ active: true, currentWindow: true });
      
      const activeTab = currentTab[0];
      if (!activeTab) {
        throw new Error('无法获取当前活动标签页信息');
      }

      console.log('当前活动标签页信息:', activeTab);
      // 构建要传递的数据
      const toolData = {
        title: activeTab.title || '',
        url: activeTab.url || '',
        icon: activeTab.favIconUrl || 'public/placeholder.svg'
      };
      console.log('准备传递的数据:', toolData);

      // 打开新标签页并传递数据
      const newTabUrl = 'index.html?action=add&' + new URLSearchParams(toolData).toString();
      console.log('即将打开新标签页:', newTabUrl);
      
      await chrome.tabs.create({ url: newTabUrl });
    } catch (error) {
      console.error('处理点击事件时发生错误:', error);
    }
  });
} catch (error) {
  console.error('注册事件监听器时发生错误:', error);
}
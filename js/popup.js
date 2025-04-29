document.addEventListener('DOMContentLoaded', async () => {
  // 获取当前标签页信息
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // 预填充表单
  if (tab) {
    document.getElementById('title').value = tab.title || '';
    document.getElementById('url').value = tab.url || '';
  }

  // 监听表单提交
  document.getElementById('addToolForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = {
      title: document.getElementById('title').value,
      url: document.getElementById('url').value,
      description: document.getElementById('description').value,
      category: document.getElementById('category').value,
      icon: tab.favIconUrl || 'public/placeholder.svg',
      views: 0,
      likes: 0,
      id: Date.now().toString()
    };

    try {
      // 获取现有工具列表
      const result = await chrome.storage.local.get('tools');
      const tools = result.tools || [];
      
      // 添加新工具
      tools.push(formData);
      
      // 保存更新后的工具列表
      await chrome.storage.local.set({ tools });
      
      // 关闭弹窗
      window.close();
    } catch (error) {
      console.error('保存工具时发生错误:', error);
    }
  });
});
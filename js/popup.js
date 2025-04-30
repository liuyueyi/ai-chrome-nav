document.addEventListener('DOMContentLoaded', async () => {
    // 获取当前标签页信息
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const description = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const metaTags = document.querySelectorAll('meta');
            const descriptionTag = Array.from(metaTags).find(tag => tag.name.toLowerCase() === 'description');
            return descriptionTag ? descriptionTag.content : '';
        }
    }).then(results => results[0]?.result || '');


    // 预填充表单
    if (tab) {
        cacheGetToolsData().then(tools => {
            // 根据url 检查是否已存在相同的工具
            const currentUrl = tab.url;
            const existingTool = tools.find(tool => tool.url === currentUrl);
            if (existingTool) {
                document.getElementById('category').value = existingTool.category;
                document.getElementById('add-nav-btn').innerText = '更新导航卡';
            }
        })
        document.getElementById('title').value = tab.title || '';
        document.getElementById('url').value = tab.url || '';
        document.getElementById('icon').value = tab.favIconUrl || 'public/placeholder.svg';
        document.getElementById('description').value = description || tab.description || tab.title + "的描述";
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
            cacheGetToolsData().then(tools => {
                // 根据url 检查是否已存在相同的工具
                const existingTool = tools.find(tool => tool.url === formData.url);
                if (existingTool) {
                    // 更新已存在的工具
                    existingTool.title = formData.title;
                    existingTool.description = formData.description;
                    existingTool.category = formData.category;
                    existingTool.icon = formData.icon;
                } else {
                    // 添加新工具
                    tools.push(formData);
                }

                console.error('保存内容', JSON.stringify(tools))

                // 保存更新后的工具列表
                cacheSaveToolsData(tools).then(() => {
                    console.error('工具已保存');
                });
                // 关闭弹窗
                window.close();
            });
        } catch (error) {
            console.error('保存工具时发生错误:', error);
        }
    });
});